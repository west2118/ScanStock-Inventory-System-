export const summaryQuery = `
    SELECT 
      (SELECT COUNT(*) FROM branches)::int AS "totalBranches",

      (
        (SELECT COALESCE(SUM(total_amount), 0) 
        FROM transactions
        WHERE created_at >= DATE_TRUNC('year', CURRENT_DATE)
            AND created_at < DATE_TRUNC('year', CURRENT_DATE) + INTERVAL '1 year'
            AND status = 'completed') 
        + 
        (SELECT COALESCE(SUM(total_amount), 0)
        FROM orders
        WHERE placed_at >= DATE_TRUNC('year', CURRENT_DATE)
            AND placed_at < DATE_TRUNC('year', CURRENT_DATE) + INTERVAL '1 year'
            AND order_status IN ('delivered', 'completed')
            AND EXISTS (SELECT 1 FROM order_payments op WHERE op.order_id = orders.id AND op.payment_status = 'paid'))
      )::int AS "totalSales",

      (SELECT COALESCE(SUM(stock), 0) FROM branch_inventory)::int AS "totalStocks"
`;

export const topPerformingQuery = `
    WITH BranchSales AS (
        SELECT branch_id, SUM(total_amount) AS total_sales
        FROM transactions
        WHERE status = 'completed'
          AND created_at >= DATE_TRUNC('year', CURRENT_DATE)
          AND created_at < DATE_TRUNC('year', CURRENT_DATE) + INTERVAL '1 year'
        GROUP BY branch_id
    ),
    BranchOrders AS (
        SELECT branch_id, SUM(total_amount) AS total_sales
        FROM orders
        WHERE placed_at >= DATE_TRUNC('year', CURRENT_DATE)
          AND placed_at < DATE_TRUNC('year', CURRENT_DATE) + INTERVAL '1 year'
          AND order_status IN ('delivered', 'completed')
          AND EXISTS (SELECT 1 FROM order_payments op WHERE op.order_id = orders.id AND op.payment_status = 'paid')
        GROUP BY branch_id
    )
    SELECT
        b.branch_name AS name,
        COALESCE(
            CASE WHEN b.branch_name ILIKE '%Central%' THEN o.total_sales
            ELSE s.total_sales END,
        0)::int AS value
    FROM branches b
    LEFT JOIN BranchSales s ON s.branch_id = b.id
    LEFT JOIN BranchOrders o ON o.branch_id = b.id
    ORDER BY value DESC NULLS LAST
    LIMIT 1
`;

export const needsImprovementQuery = `
    WITH BranchSales AS (
        SELECT branch_id, SUM(total_amount) AS total_sales
        FROM transactions
        WHERE status = 'completed'
          AND created_at >= DATE_TRUNC('year', CURRENT_DATE)
          AND created_at < DATE_TRUNC('year', CURRENT_DATE) + INTERVAL '1 year'
        GROUP BY branch_id
    ),
    BranchOrders AS (
        SELECT branch_id, SUM(total_amount) AS total_sales
        FROM orders
        WHERE placed_at >= DATE_TRUNC('year', CURRENT_DATE)
          AND placed_at < DATE_TRUNC('year', CURRENT_DATE) + INTERVAL '1 year'
          AND order_status IN ('delivered', 'completed')
          AND EXISTS (SELECT 1 FROM order_payments op WHERE op.order_id = orders.id AND op.payment_status = 'paid')
        GROUP BY branch_id
    )
    SELECT
        b.branch_name AS name,
        COALESCE(
            CASE WHEN b.branch_name ILIKE '%Central%' THEN o.total_sales
            ELSE s.total_sales END,
        0)::int AS value
    FROM branches b
    LEFT JOIN BranchSales s ON s.branch_id = b.id
    LEFT JOIN BranchOrders o ON o.branch_id = b.id
    ORDER BY value ASC NULLS FIRST
    LIMIT 1
`;

export const monthlySalesOverviewQuery = `
    WITH months AS (
        SELECT generate_series(
            DATE_TRUNC('year', CURRENT_DATE),
            DATE_TRUNC('year', CURRENT_DATE) + INTERVAL '11 months',
            INTERVAL '1 month'
        ) AS month
    ),
    StoreSales AS (
        SELECT DATE_TRUNC('month', created_at) AS month, SUM(total_amount) AS revenue
        FROM transactions
        WHERE status = 'completed'
          AND created_at >= DATE_TRUNC('year', CURRENT_DATE)
          AND created_at < DATE_TRUNC('year', CURRENT_DATE) + INTERVAL '1 year'
        GROUP BY DATE_TRUNC('month', created_at)
    ),
    DeliverySales AS (
        SELECT DATE_TRUNC('month', placed_at) AS month, SUM(o.total_amount) AS revenue
        FROM orders o
        WHERE o.placed_at >= DATE_TRUNC('year', CURRENT_DATE)
          AND o.placed_at < DATE_TRUNC('year', CURRENT_DATE) + INTERVAL '1 year'
          AND o.order_status IN ('delivered', 'completed')
          AND EXISTS (SELECT 1 FROM order_payments op WHERE op.order_id = o.id AND op.payment_status = 'paid')
        GROUP BY DATE_TRUNC('month', placed_at)
    )
    SELECT
        TO_CHAR(m.month, 'Mon') AS "name",
        COALESCE(s.revenue, 0)::int AS "storeRevenue",
        COALESCE(d.revenue, 0)::int AS "deliveryRevenue"
    FROM months m
    LEFT JOIN StoreSales s ON s.month = m.month
    LEFT JOIN DeliverySales d ON d.month = m.month
    ORDER BY m.month
`;

export const inventoryDistributionQuery = `
    SELECT 
        c.name AS name,
        COALESCE(SUM(bi.stock), 0)::int AS value
    FROM products p
    LEFT JOIN branch_inventory bi ON bi.product_id = p.id
    LEFT JOIN categories c ON c.id = p.category_id
    GROUP BY c.name
    ORDER BY value DESC
`;

export const branchPerformanceQuery = `
    WITH BranchSales AS (
        SELECT branch_id, SUM(total_amount) AS total_sales
        FROM transactions
        WHERE status = 'completed'
          AND created_at >= DATE_TRUNC('year', CURRENT_DATE)
          AND created_at < DATE_TRUNC('year', CURRENT_DATE) + INTERVAL '1 year'
        GROUP BY branch_id
    ),
    BranchOrders AS (
        SELECT branch_id, SUM(total_amount) AS total_sales
        FROM orders
        WHERE placed_at >= DATE_TRUNC('year', CURRENT_DATE)
          AND placed_at < DATE_TRUNC('year', CURRENT_DATE) + INTERVAL '1 year'
          AND order_status IN ('delivered', 'completed')
          AND EXISTS (SELECT 1 FROM order_payments op WHERE op.order_id = orders.id AND op.payment_status = 'paid')
        GROUP BY branch_id
    )
    SELECT 
        b.branch_name AS name,
        COALESCE(
            CASE WHEN b.branch_name ILIKE '%Central%' THEN o.total_sales
            ELSE s.total_sales END,
        0)::int AS value
    FROM branches b
    LEFT JOIN BranchSales s ON s.branch_id = b.id
    LEFT JOIN BranchOrders o ON o.branch_id = b.id
    ORDER BY value DESC
`;

export const employeeProductivityOverviewQuery = `
    WITH BranchUsers AS (
        SELECT branch_id, COUNT(id)::int AS num_employees
        FROM users
        GROUP BY branch_id
    ),
    BranchSales AS (
        SELECT branch_id, SUM(total_amount) AS total_sales, COUNT(id) AS total_tickets
        FROM transactions
        WHERE status = 'completed'
          AND created_at >= DATE_TRUNC('year', CURRENT_DATE)
          AND created_at < DATE_TRUNC('year', CURRENT_DATE) + INTERVAL '1 year'
        GROUP BY branch_id
    ),
    BranchOrders AS (
        SELECT branch_id, SUM(total_amount) AS total_sales, COUNT(id) AS total_tickets
        FROM orders
        WHERE placed_at >= DATE_TRUNC('year', CURRENT_DATE)
          AND placed_at < DATE_TRUNC('year', CURRENT_DATE) + INTERVAL '1 year'
          AND order_status IN ('delivered', 'completed')
          AND EXISTS (SELECT 1 FROM order_payments op WHERE op.order_id = orders.id AND op.payment_status = 'paid')
        GROUP BY branch_id
    )
    SELECT
        b.branch_name AS name,
        COALESCE(u.num_employees, 0)::int AS "employees",
        ROUND(
            COALESCE(
                CASE WHEN b.branch_name ILIKE '%Central%' THEN o.total_sales
                ELSE s.total_sales END,
            0) / NULLIF(u.num_employees, 0)
        )::int AS "salesPerEmployee",
        COALESCE(
            ROUND(
                (CASE WHEN b.branch_name ILIKE '%Central%' THEN o.total_tickets
                ELSE s.total_tickets END)::numeric / NULLIF(u.num_employees, 0),
                0
            ),0
        )::int AS "ticketsPerEmployee"
    FROM branches b
    LEFT JOIN BranchUsers u ON u.branch_id = b.id
    LEFT JOIN BranchSales s ON s.branch_id = b.id
    LEFT JOIN BranchOrders o ON o.branch_id = b.id
    ORDER BY "salesPerEmployee" DESC
`;
