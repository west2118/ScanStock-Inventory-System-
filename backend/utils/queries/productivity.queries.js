export const productivitySummaryQuery = `
SELECT
  (
    SELECT COUNT(*)
    FROM users
    WHERE status <> 'archived'
      AND role NOT IN ('central_admin', 'customer')
  )::int AS "totalEmployees",

  (
    (SELECT COALESCE(SUM(t.total_amount), 0)
    FROM transactions t
    WHERE t.status <> 'voided'
      AND t.payment_status = 'paid')
    +
    (SELECT COALESCE(SUM(o.total_amount), 0)
    FROM orders o
    WHERE o.order_status IN ('delivered', 'completed')
      AND EXISTS (SELECT 1 FROM order_payments op WHERE op.order_id = o.id AND op.payment_status = 'paid'))
  )::numeric(12,2) AS "totalSales",

  (
    WITH branch_users AS (
        SELECT branch_id, COUNT(id) AS num_employees
        FROM users
        WHERE status <> 'archived' AND role NOT IN ('central_admin', 'customer')
        GROUP BY branch_id
    ),
    branch_orders AS (
        SELECT branch_id, SUM(total_amount) AS total_sales
        FROM orders
        WHERE order_status IN ('delivered', 'completed')
          AND EXISTS (SELECT 1 FROM order_payments op WHERE op.order_id = orders.id AND op.payment_status = 'paid')
        GROUP BY branch_id
    ),
    employee_sales AS (
        SELECT
            u.id,
            CONCAT(u.first_name, ' ', u.last_name) AS name,
            COALESCE(
                CASE WHEN b.branch_name ILIKE '%Central%' THEN (o.total_sales / NULLIF(bu.num_employees, 0))
                ELSE SUM(t.total_amount) END,
                0
            ) AS sales
        FROM users u
        LEFT JOIN branches b ON b.id = u.branch_id
        LEFT JOIN branch_users bu ON bu.branch_id = b.id
        LEFT JOIN branch_orders o ON o.branch_id = b.id
        LEFT JOIN transactions t
            ON t.handled_by = u.id
            AND t.status <> 'voided'
            AND t.payment_status = 'paid'
        WHERE u.status <> 'archived'
          AND u.role NOT IN ('central_admin', 'customer')
        GROUP BY u.id, u.first_name, u.last_name, b.branch_name, bu.num_employees, o.total_sales
    )
    SELECT name
    FROM employee_sales
    WHERE sales > 0
    ORDER BY sales DESC
    LIMIT 1
  ) AS "topPerformer",

  (
    WITH branch_users AS (
        SELECT branch_id, COUNT(id) AS num_employees
        FROM users
        WHERE status <> 'archived' AND role NOT IN ('central_admin', 'customer')
        GROUP BY branch_id
    ),
    branch_orders AS (
        SELECT branch_id, COUNT(id) AS total_tickets
        FROM orders
        WHERE order_status IN ('delivered', 'completed')
          AND EXISTS (SELECT 1 FROM order_payments op WHERE op.order_id = orders.id AND op.payment_status = 'paid')
        GROUP BY branch_id
    ),
    employee_tickets AS (
        SELECT
            u.id,
            COALESCE(
                CASE WHEN b.branch_name ILIKE '%Central%' THEN (o.total_tickets / NULLIF(bu.num_employees, 0))
                ELSE COUNT(t.id) END,
                0
            ) AS tickets
        FROM users u
        LEFT JOIN branches b ON b.id = u.branch_id
        LEFT JOIN branch_users bu ON bu.branch_id = b.id
        LEFT JOIN branch_orders o ON o.branch_id = b.id
        LEFT JOIN transactions t
            ON t.handled_by = u.id
            AND t.status <> 'voided'
            AND t.payment_status = 'paid'
        WHERE u.status <> 'archived'
          AND u.role NOT IN ('central_admin', 'customer')
        GROUP BY u.id, b.branch_name, bu.num_employees, o.total_tickets
    )
    SELECT COALESCE(AVG(tickets), 0)
    FROM employee_tickets
  )::numeric(10,1) AS "avgProductivity"
`;

export const productivityByBranchQuery = `
WITH BranchUsers AS (
    SELECT branch_id, COUNT(id) AS num_employees
    FROM users
    WHERE status <> 'archived' AND role NOT IN ('central_admin', 'customer')
    GROUP BY branch_id
),
BranchSales AS (
    SELECT branch_id, SUM(total_amount) AS total_sales
    FROM transactions
    WHERE status <> 'voided' AND payment_status = 'paid'
      AND created_at >= DATE_TRUNC('year', CURRENT_DATE)
      AND created_at < DATE_TRUNC('year', CURRENT_DATE) + INTERVAL '1 year'
    GROUP BY branch_id
),
BranchOrders AS (
    SELECT branch_id, SUM(total_amount) AS total_sales
    FROM orders
    WHERE order_status IN ('delivered', 'completed')
      AND EXISTS (SELECT 1 FROM order_payments op WHERE op.order_id = orders.id AND op.payment_status = 'paid')
      AND placed_at >= DATE_TRUNC('year', CURRENT_DATE)
      AND placed_at < DATE_TRUNC('year', CURRENT_DATE) + INTERVAL '1 year'
    GROUP BY branch_id
),
branch_productivity AS (
    SELECT
        b.branch_name AS name,
        COALESCE(
            CASE WHEN b.branch_name ILIKE '%Central%' THEN o.total_sales ELSE s.total_sales END,
            0
        ) / NULLIF(COALESCE(u.num_employees, 0), 0) AS productivity
    FROM branches b
    LEFT JOIN BranchUsers u ON u.branch_id = b.id
    LEFT JOIN BranchSales s ON s.branch_id = b.id
    LEFT JOIN BranchOrders o ON o.branch_id = b.id
)
SELECT
    name,
    COALESCE(
        ROUND(
            (
                productivity
                / NULLIF(MAX(productivity) OVER (), 0)
            ) * 100,
            1
        ),
        0
    ) AS value
FROM branch_productivity
ORDER BY value DESC;
`;

export const productivityTrendsMonthlyQuery = `
    WITH months AS (
        SELECT generate_series(
            DATE_TRUNC('year', CURRENT_DATE),
            DATE_TRUNC('year', CURRENT_DATE) + INTERVAL '11 months',
            INTERVAL '1 month'
        ) AS month
    ),
    BranchUsers AS (
        SELECT branch_id, COUNT(id) AS num_employees
        FROM users
        WHERE status <> 'archived' AND role NOT IN ('central_admin', 'customer')
        GROUP BY branch_id
    ),
    StoreSales AS (
        SELECT DATE_TRUNC('month', created_at) AS month, branch_id, SUM(total_amount) AS total_sales
        FROM transactions
        WHERE status <> 'voided' AND payment_status = 'paid'
        GROUP BY DATE_TRUNC('month', created_at), branch_id
    ),
    DeliverySales AS (
        SELECT DATE_TRUNC('month', placed_at) AS month, branch_id, SUM(total_amount) AS total_sales
        FROM orders
        WHERE order_status IN ('delivered', 'completed')
          AND EXISTS (SELECT 1 FROM order_payments op WHERE op.order_id = orders.id AND op.payment_status = 'paid')
        GROUP BY DATE_TRUNC('month', placed_at), branch_id
    ),
    monthly_productivity AS (
        SELECT
            m.month,
            b.branch_name,
            COALESCE(
                CASE WHEN b.branch_name ILIKE '%Central%' THEN o.total_sales ELSE s.total_sales END,
                0
            ) / NULLIF(COALESCE(u.num_employees, 0), 0) AS productivity
        FROM months m
        CROSS JOIN branches b
        LEFT JOIN BranchUsers u ON u.branch_id = b.id
        LEFT JOIN StoreSales s ON s.branch_id = b.id AND s.month = m.month
        LEFT JOIN DeliverySales o ON o.branch_id = b.id AND o.month = m.month
    ),
    productivity_percentage AS (
        SELECT
            month,
            branch_name,
            COALESCE(
                ROUND(
                    (
                        productivity * 100.0
                        /
                        NULLIF(
                            MAX(productivity) OVER (PARTITION BY month),
                            0
                        )
                    )::numeric,
                    1
                )
            , 0) AS productivity
        FROM monthly_productivity
    )
    SELECT
        TO_CHAR(month, 'Mon') AS "name",
        json_agg(
            json_build_object(
                'branch', branch_name,
                'productivity', productivity
            )
            ORDER BY branch_name
        ) AS "branches"
    FROM productivity_percentage
    GROUP BY month
    ORDER BY month;
`;

export const topPerformersMonthQuery = `
WITH branch_users AS (
    SELECT branch_id, COUNT(id) AS num_employees
    FROM users
    WHERE status <> 'archived' AND role NOT IN ('central_admin', 'customer')
    GROUP BY branch_id
),
branch_orders AS (
    SELECT branch_id, SUM(total_amount) AS total_sales
    FROM orders
    WHERE order_status IN ('delivered', 'completed')
      AND EXISTS (SELECT 1 FROM order_payments op WHERE op.order_id = orders.id AND op.payment_status = 'paid')
      AND placed_at >= DATE_TRUNC('month', CURRENT_DATE)
      AND placed_at < DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month'
    GROUP BY branch_id
),
employee_sales AS (
    SELECT
        u.id,
        CONCAT(u.first_name, ' ', u.last_name) AS name,
        u.role,
        b.branch_name AS "branch",
        COALESCE(
            CASE WHEN b.branch_name ILIKE '%Central%' THEN (o.total_sales / NULLIF(bu.num_employees, 0))
            ELSE SUM(t.total_amount) END,
            0
        ) AS sales
    FROM users u
    LEFT JOIN branches b ON b.id = u.branch_id
    LEFT JOIN branch_users bu ON bu.branch_id = b.id
    LEFT JOIN branch_orders o ON o.branch_id = b.id
    LEFT JOIN transactions t
        ON t.handled_by = u.id
        AND t.status <> 'voided'
        AND t.payment_status = 'paid'
        AND t.created_at >= DATE_TRUNC('month', CURRENT_DATE)
        AND t.created_at < DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month'
    WHERE u.status <> 'archived'
      AND u.role NOT IN ('central_admin', 'customer')
    GROUP BY u.id, u.first_name, u.last_name, u.role, b.id, b.branch_name, bu.num_employees, o.total_sales
)
SELECT
    id,
    name,
    role,
    "branch",
    sales::int AS value,
    COALESCE(
        ROUND(
            (
                sales * 100.0
                / NULLIF(MAX(sales) OVER (), 0)
            )::numeric,
            1
        ), 0
    ) AS productivity
FROM employee_sales
WHERE sales > 0
ORDER BY sales DESC
LIMIT 5;
`;

export const needsImprovementMonthQuery = `
WITH branch_users AS (
    SELECT branch_id, COUNT(id) AS num_employees
    FROM users
    WHERE status <> 'archived' AND role NOT IN ('central_admin', 'customer')
    GROUP BY branch_id
),
branch_orders AS (
    SELECT branch_id, SUM(total_amount) AS total_sales
    FROM orders
    WHERE order_status IN ('delivered', 'completed')
      AND EXISTS (SELECT 1 FROM order_payments op WHERE op.order_id = orders.id AND op.payment_status = 'paid')
      AND placed_at >= DATE_TRUNC('month', CURRENT_DATE)
      AND placed_at < DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month'
    GROUP BY branch_id
),
employee_sales AS (
    SELECT
        u.id,
        CONCAT(u.first_name, ' ', u.last_name) AS name,
        u.role,
        b.branch_name AS "branch",
        COALESCE(
            CASE WHEN b.branch_name ILIKE '%Central%' THEN (o.total_sales / NULLIF(bu.num_employees, 0))
            ELSE SUM(t.total_amount) END,
            0
        ) AS sales
    FROM users u
    LEFT JOIN branches b ON b.id = u.branch_id
    LEFT JOIN branch_users bu ON bu.branch_id = b.id
    LEFT JOIN branch_orders o ON o.branch_id = b.id
    LEFT JOIN transactions t
        ON t.handled_by = u.id
        AND t.status <> 'voided'
        AND t.payment_status = 'paid'
        AND t.created_at >= DATE_TRUNC('month', CURRENT_DATE)
        AND t.created_at < DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month'
    WHERE u.status <> 'archived'
      AND u.role NOT IN ('central_admin', 'customer')
    GROUP BY u.id, u.first_name, u.last_name, u.role, b.id, b.branch_name, bu.num_employees, o.total_sales
),
global_metrics AS (
    SELECT MAX(sales) AS max_sales FROM employee_sales
),
top_performers AS (
    SELECT id FROM employee_sales WHERE sales > 0 ORDER BY sales DESC LIMIT 5
)
SELECT
    e.id,
    e.name,
    e.role,
    e."branch",
    e.sales::int AS value,
    COALESCE(
        ROUND(
            (
                e.sales * 100.0
                / NULLIF((SELECT max_sales FROM global_metrics), 0)
            )::numeric,
            1
        ), 0
    ) AS productivity
FROM employee_sales e
WHERE e.id NOT IN (SELECT id FROM top_performers)
ORDER BY e.sales ASC
LIMIT 5;
`;

export const employeePerformanceQuery = `
WITH branch_users AS (
    SELECT branch_id, COUNT(id) AS num_employees
    FROM users
    WHERE status <> 'archived' AND role NOT IN ('central_admin', 'customer')
    GROUP BY branch_id
),
branch_orders AS (
    SELECT branch_id, SUM(total_amount) AS total_sales, COUNT(id) AS total_tickets
    FROM orders
    WHERE order_status IN ('delivered', 'completed')
      AND EXISTS (SELECT 1 FROM order_payments op WHERE op.order_id = orders.id AND op.payment_status = 'paid')
      AND placed_at >= DATE_TRUNC('year', CURRENT_DATE)
      AND placed_at < DATE_TRUNC('year', CURRENT_DATE) + INTERVAL '1 year'
    GROUP BY branch_id
),
employee_performance AS (
    SELECT
        u.id,
        CONCAT(u.first_name, ' ', u.last_name) AS "employeeName",
        b.branch_name AS "branchName",
        u.role,

        COALESCE(
            CASE WHEN b.branch_name ILIKE '%Central%' THEN (o.total_sales / NULLIF(bu.num_employees, 0))
            ELSE SUM(t.total_amount) END,
            0
        )::int AS "totalSales",

        COALESCE(
            CASE WHEN b.branch_name ILIKE '%Central%' THEN (o.total_tickets / NULLIF(bu.num_employees, 0))
            ELSE COUNT(t.id) END,
            0
        )::int AS "totalTickets"

    FROM users u
    LEFT JOIN branches b ON b.id = u.branch_id
    LEFT JOIN branch_users bu ON bu.branch_id = b.id
    LEFT JOIN branch_orders o ON o.branch_id = b.id
    LEFT JOIN transactions t
        ON t.handled_by = u.id
        AND t.status <> 'voided'
        AND t.payment_status = 'paid'
        AND t.created_at >= DATE_TRUNC('year', CURRENT_DATE)
        AND t.created_at < DATE_TRUNC('year', CURRENT_DATE) + INTERVAL '1 year'
    WHERE u.status <> 'archived'
      AND u.role NOT IN ('central_admin', 'customer')
    GROUP BY
        u.id,
        u.first_name,
        u.last_name,
        u.role,
        b.branch_name,
        bu.num_employees,
        o.total_sales,
        o.total_tickets
),
employee_metrics AS (
    SELECT
        *,
        COALESCE(
            "totalSales"::numeric
            / NULLIF("totalTickets", 0),
            0
        ) AS avg_ticket,

        ROUND(
            (
                "totalSales" * 100.0
                / NULLIF(MAX("totalSales") OVER (), 0)
            )::numeric,
            1
        ) AS productivity
    FROM employee_performance
)
SELECT
    DENSE_RANK() OVER (
        ORDER BY productivity DESC
    ) AS rank,

    id,
    "employeeName",
    "branchName",
    role,

    "totalSales",
    "totalTickets",

    ROUND(avg_ticket, 2) AS "avgTicket",

    productivity
FROM employee_metrics
ORDER BY rank, "totalSales" DESC;
`;
