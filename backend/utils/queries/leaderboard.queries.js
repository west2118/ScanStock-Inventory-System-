export const topPerformingBranchesQuery = `
    WITH branch_sales AS (
        SELECT branch_id, SUM(total_amount) AS total
        FROM transactions
        WHERE status <> 'voided' AND payment_status = 'paid'
          AND created_at >= DATE_TRUNC('year', CURRENT_DATE)
          AND created_at < DATE_TRUNC('year', CURRENT_DATE) + INTERVAL '1 year'
        GROUP BY branch_id
    ),
    branch_orders AS (
        SELECT branch_id, SUM(total_amount) AS total
        FROM orders
        WHERE order_status IN ('delivered', 'completed')
          AND EXISTS (SELECT 1 FROM order_payments op WHERE op.order_id = orders.id AND op.payment_status = 'paid')
          AND placed_at >= DATE_TRUNC('year', CURRENT_DATE)
          AND placed_at < DATE_TRUNC('year', CURRENT_DATE) + INTERVAL '1 year'
        GROUP BY branch_id
    )
    SELECT
        b.branch_name AS name,
        COALESCE(
            CASE WHEN b.branch_name ILIKE '%Central%' THEN o.total ELSE s.total END,
            0
        )::int AS value
    FROM branches b
    LEFT JOIN branch_sales s ON s.branch_id = b.id
    LEFT JOIN branch_orders o ON o.branch_id = b.id
    ORDER BY value DESC
    LIMIT 3
`;

export const branchPerformanceRankingQuery = `
WITH BranchUsers AS (
    SELECT branch_id, COUNT(id) AS num_employees
    FROM users
    WHERE status <> 'archived' AND role NOT IN ('central_admin', 'customer')
    GROUP BY branch_id
),
BranchSales AS (
    SELECT 
        branch_id, 
        SUM(CASE WHEN created_at >= DATE_TRUNC('year', CURRENT_DATE) THEN total_amount ELSE 0 END) AS total_sales,
        SUM(CASE WHEN created_at < DATE_TRUNC('year', CURRENT_DATE) THEN total_amount ELSE 0 END) AS prev_sales,
        COUNT(id) FILTER (WHERE created_at >= DATE_TRUNC('year', CURRENT_DATE)) AS total_tickets
    FROM transactions
    WHERE status <> 'voided' AND payment_status = 'paid'
      AND created_at >= DATE_TRUNC('year', CURRENT_DATE) - INTERVAL '1 year'
      AND created_at < DATE_TRUNC('year', CURRENT_DATE) + INTERVAL '1 year'
    GROUP BY branch_id
),
BranchOrders AS (
    SELECT 
        branch_id, 
        SUM(CASE WHEN placed_at >= DATE_TRUNC('year', CURRENT_DATE) THEN total_amount ELSE 0 END) AS total_sales,
        SUM(CASE WHEN placed_at < DATE_TRUNC('year', CURRENT_DATE) THEN total_amount ELSE 0 END) AS prev_sales,
        COUNT(id) FILTER (WHERE placed_at >= DATE_TRUNC('year', CURRENT_DATE)) AS total_tickets
    FROM orders
    WHERE order_status IN ('delivered', 'completed')
      AND EXISTS (SELECT 1 FROM order_payments op WHERE op.order_id = orders.id AND op.payment_status = 'paid')
      AND placed_at >= DATE_TRUNC('year', CURRENT_DATE) - INTERVAL '1 year'
      AND placed_at < DATE_TRUNC('year', CURRENT_DATE) + INTERVAL '1 year'
    GROUP BY branch_id
),
branch_performance AS (
    SELECT
        b.id,
        b.branch_code AS "branchCode",
        b.region,
        b.branch_name AS name,

        COALESCE(
            CASE WHEN b.branch_name ILIKE '%Central%' THEN o.total_sales ELSE s.total_sales END,
            0
        )::int AS "totalSales",

        COALESCE(
            CASE WHEN b.branch_name ILIKE '%Central%' THEN o.prev_sales ELSE s.prev_sales END,
            0
        )::int AS "previousYearSales",

        COALESCE(
            CASE WHEN b.branch_name ILIKE '%Central%' THEN o.total_tickets ELSE s.total_tickets END,
            0
        )::int AS "totalTickets",

        COALESCE(u.num_employees, 0)::int AS "employeeCount"

    FROM branches b
    LEFT JOIN BranchUsers u ON u.branch_id = b.id
    LEFT JOIN BranchSales s ON s.branch_id = b.id
    LEFT JOIN BranchOrders o ON o.branch_id = b.id
),
branch_metrics AS (
    SELECT
        *,
        COALESCE(
            "totalSales"::numeric
            / NULLIF("employeeCount", 0),
            0
        ) AS sales_per_employee,

        COALESCE(
            "totalSales"::numeric
            / NULLIF("totalTickets", 0),
            0
        ) AS avg_ticket
    FROM branch_performance
),
final_metrics AS (
    SELECT
        *,
        ROUND(
            (
                sales_per_employee * 100.0
                /
                NULLIF(MAX(sales_per_employee) OVER (), 0)
            )::numeric,
            1
        ) AS productivity,

        ROUND(
            (
                ("totalSales" - "previousYearSales") * 100.0
                /
                NULLIF("previousYearSales", 0)
            )::numeric,
            1
        ) AS growth
    FROM branch_metrics
)
SELECT
    DENSE_RANK() OVER (ORDER BY productivity DESC) AS rank,
    name,
    "branchCode",
    region,
    "totalSales",
    "totalTickets",
    "employeeCount",
    ROUND(avg_ticket, 2) AS "avgTicket",
    productivity,
    growth
FROM final_metrics
ORDER BY rank;
`;

export const productBestPerformanceRankingQuery = `
WITH ProductStoreSales AS (
    SELECT 
        ti.product_id,
        SUM(CASE WHEN t.created_at >= DATE_TRUNC('year', CURRENT_DATE) THEN ti.quantity * ti.price ELSE 0 END) AS current_sales,
        SUM(CASE WHEN t.created_at >= DATE_TRUNC('year', CURRENT_DATE) THEN ti.quantity ELSE 0 END) AS current_qty,
        SUM(CASE WHEN t.created_at < DATE_TRUNC('year', CURRENT_DATE) THEN ti.quantity * ti.price ELSE 0 END) AS prev_sales
    FROM transaction_items ti
    JOIN transactions t ON t.id = ti.transaction_id
    WHERE t.status <> 'voided' AND t.payment_status = 'paid'
      AND t.created_at >= DATE_TRUNC('year', CURRENT_DATE) - INTERVAL '1 year'
      AND t.created_at < DATE_TRUNC('year', CURRENT_DATE) + INTERVAL '1 year'
    GROUP BY ti.product_id
),
ProductDeliverySales AS (
    SELECT 
        oi.product_id,
        SUM(CASE WHEN o.placed_at >= DATE_TRUNC('year', CURRENT_DATE) THEN oi.quantity * oi.price ELSE 0 END) AS current_sales,
        SUM(CASE WHEN o.placed_at >= DATE_TRUNC('year', CURRENT_DATE) THEN oi.quantity ELSE 0 END) AS current_qty,
        SUM(CASE WHEN o.placed_at < DATE_TRUNC('year', CURRENT_DATE) THEN oi.quantity * oi.price ELSE 0 END) AS prev_sales
    FROM order_items oi
    JOIN orders o ON o.id = oi.order_id
    WHERE o.order_status IN ('delivered', 'completed')
      AND EXISTS (SELECT 1 FROM order_payments op WHERE op.order_id = o.id AND op.payment_status = 'paid')
      AND o.placed_at >= DATE_TRUNC('year', CURRENT_DATE) - INTERVAL '1 year'
      AND o.placed_at < DATE_TRUNC('year', CURRENT_DATE) + INTERVAL '1 year'
    GROUP BY oi.product_id
),
product_performance AS (
    SELECT
        p.id,
        p.product_name AS "productName",
        c.name AS category,

        (
            COALESCE(s.current_sales, 0) + COALESCE(d.current_sales, 0)
        )::int AS "totalSales",

        (
            COALESCE(s.current_qty, 0) + COALESCE(d.current_qty, 0)
        )::int AS "totalUnitsSold",

        (
            COALESCE(s.prev_sales, 0) + COALESCE(d.prev_sales, 0)
        )::int AS "previousYearSales"

    FROM products p
    LEFT JOIN categories c ON c.id = p.category_id
    LEFT JOIN ProductStoreSales s ON s.product_id = p.id
    LEFT JOIN ProductDeliverySales d ON d.product_id = p.id
    WHERE p.status <> 'archived'
)
SELECT
    DENSE_RANK() OVER (
        ORDER BY "totalSales" DESC
    ) AS rank,

    id,
    category,
    "productName",
    "totalSales",
    "totalUnitsSold",

    COALESCE(
        ROUND(
            (
                ("totalSales" - "previousYearSales") * 100.0
                /
                NULLIF("previousYearSales", 0)
            )::numeric,
            1
        ),
        0
    ) AS growth

FROM product_performance
ORDER BY rank, "totalSales" DESC;
`;
