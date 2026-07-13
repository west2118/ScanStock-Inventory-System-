export const salesSummaryQuery = `
    WITH BranchSales AS (
        SELECT branch_id, SUM(total_amount) AS total_sales
        FROM transactions
        WHERE created_at >= DATE_TRUNC('year', CURRENT_DATE)
          AND created_at < DATE_TRUNC('year', CURRENT_DATE) + INTERVAL '1 year'
          AND status = 'completed'
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
    ),
    BranchTotals AS (
        SELECT 
            b.id AS branch_id,
            b.branch_name,
            COALESCE(CASE WHEN b.branch_name ILIKE '%Central%' THEN o.total_sales ELSE s.total_sales END, 0) AS total_sales
        FROM branches b
        LEFT JOIN BranchSales s ON s.branch_id = b.id
        LEFT JOIN BranchOrders o ON o.branch_id = b.id
    ),
    branch_growth_current AS (
        SELECT
            b.id AS branch_id,
            b.branch_name,
            COALESCE(CASE WHEN b.branch_name ILIKE '%Central%' THEN o.current_sales ELSE s.current_sales END, 0) AS current_sales
        FROM branches b
        LEFT JOIN (
            SELECT branch_id, SUM(total_amount) AS current_sales
            FROM transactions
            WHERE created_at >= DATE_TRUNC('month', CURRENT_DATE)
              AND status = 'completed'
            GROUP BY branch_id
        ) s ON s.branch_id = b.id
        LEFT JOIN (
            SELECT branch_id, SUM(total_amount) AS current_sales
            FROM orders
            WHERE placed_at >= DATE_TRUNC('month', CURRENT_DATE)
              AND order_status IN ('delivered', 'completed')
              AND EXISTS (SELECT 1 FROM order_payments op WHERE op.order_id = orders.id AND op.payment_status = 'paid')
            GROUP BY branch_id
        ) o ON o.branch_id = b.id
    ),
    branch_growth_previous AS (
        SELECT
            b.id AS branch_id,
            COALESCE(CASE WHEN b.branch_name ILIKE '%Central%' THEN o.previous_sales ELSE s.previous_sales END, 0) AS previous_sales
        FROM branches b
        LEFT JOIN (
            SELECT branch_id, SUM(total_amount) AS previous_sales
            FROM transactions
            WHERE created_at >= DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '1 month'
              AND created_at < DATE_TRUNC('month', CURRENT_DATE)
              AND status = 'completed'
            GROUP BY branch_id
        ) s ON s.branch_id = b.id
        LEFT JOIN (
            SELECT branch_id, SUM(total_amount) AS previous_sales
            FROM orders
            WHERE placed_at >= DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '1 month'
              AND placed_at < DATE_TRUNC('month', CURRENT_DATE)
              AND order_status IN ('delivered', 'completed')
              AND EXISTS (SELECT 1 FROM order_payments op WHERE op.order_id = orders.id AND op.payment_status = 'paid')
            GROUP BY branch_id
        ) o ON o.branch_id = b.id
    )
    SELECT 
      (SELECT SUM(total_sales) FROM BranchTotals)::int AS "totalSales",
      (
        SELECT
            SUM(total_sales) / NULLIF((SELECT COUNT(*) FROM branches), 0)
        FROM BranchTotals
      )::int AS "avgSalesPerBranch",

      (
        SELECT json_build_object(
            'branchName', branch_name,
            'sales', total_sales::int
        )
        FROM BranchTotals
        ORDER BY total_sales DESC
        LIMIT 1
      ) AS "bestPerformingBranch",

      (
        SELECT json_build_object(
            'branchName', cur.branch_name,
            'growthPercent',
            ROUND(
            (
                (cur.current_sales - prev.previous_sales)
                / NULLIF(prev.previous_sales, 0)
            ) * 100,
            1
            )
        )
        FROM branch_growth_current cur
        JOIN branch_growth_previous prev ON cur.branch_id = prev.branch_id
        WHERE prev.previous_sales > 0
        ORDER BY
            (
            (cur.current_sales - prev.previous_sales)
            / NULLIF(prev.previous_sales, 0)
            ) DESC
        LIMIT 1
      ) AS "fastestGrowingBranch"
`;

export const salesComparisonMonthlyQuery = `
    WITH months AS (
        SELECT generate_series(
            DATE_TRUNC('year', CURRENT_DATE),
            DATE_TRUNC('year', CURRENT_DATE) + INTERVAL '11 months',
            INTERVAL '1 month'
        ) AS month
    ),
    StoreSales AS (
        SELECT
            DATE_TRUNC('month', created_at) AS month,
            branch_id,
            SUM(total_amount) AS sales
        FROM transactions
        WHERE status = 'completed'
        GROUP BY DATE_TRUNC('month', created_at), branch_id
    ),
    DeliverySales AS (
        SELECT
            DATE_TRUNC('month', placed_at) AS month,
            branch_id,
            SUM(total_amount) AS sales
        FROM orders
        WHERE order_status IN ('delivered', 'completed')
          AND EXISTS (SELECT 1 FROM order_payments op WHERE op.order_id = orders.id AND op.payment_status = 'paid')
        GROUP BY DATE_TRUNC('month', placed_at), branch_id
    ),
    monthly_sales AS (
        SELECT
            m.month,
            b.branch_name,
            COALESCE(
                CASE WHEN b.branch_name ILIKE '%Central%' THEN o.sales
                ELSE s.sales END,
            0)::int AS sales
        FROM months m
        CROSS JOIN branches b
        LEFT JOIN StoreSales s ON s.branch_id = b.id AND s.month = m.month
        LEFT JOIN DeliverySales o ON o.branch_id = b.id AND o.month = m.month
    )
    SELECT
        TO_CHAR(month, 'Mon') AS "name",
        json_agg(
            json_build_object(
                'branch', branch_name,
                'sales', sales
            )
            ORDER BY branch_name
        ) AS "branches"
    FROM monthly_sales
    GROUP BY month
    ORDER BY month;
`;

export const marketShareQuery = `
    WITH BranchSales AS (
        SELECT branch_id, SUM(total_amount) AS total_sales
        FROM transactions
        WHERE created_at >= DATE_TRUNC('year', CURRENT_DATE)
          AND created_at < DATE_TRUNC('year', CURRENT_DATE) + INTERVAL '1 year'
          AND status = 'completed'
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
    ),
    branch_sales AS (
        SELECT
            b.id,
            b.branch_name,
            COALESCE(
                CASE WHEN b.branch_name ILIKE '%Central%' THEN o.total_sales
                ELSE s.total_sales END,
            0) AS sales
        FROM branches b
        LEFT JOIN BranchSales s ON s.branch_id = b.id
        LEFT JOIN BranchOrders o ON o.branch_id = b.id
    )
    SELECT
        branch_name AS name,
        sales::int AS sales,
        ROUND(
            sales * 100.0 /
            NULLIF(SUM(sales) OVER (), 0),
            1
        )::int AS "marketShare"
    FROM branch_sales
    ORDER BY sales DESC;
`;

export const topSellingProductsByBranchQuery = `
    WITH StoreSales AS (
        SELECT
            ti.product_id,
            t.branch_id,
            SUM(ti.quantity)::int AS sold
        FROM transaction_items ti
        JOIN transactions t ON t.id = ti.transaction_id
        WHERE t.status = 'completed'
          AND t.payment_status = 'paid'
          AND t.created_at >= DATE_TRUNC('year', CURRENT_DATE)
          AND t.created_at < DATE_TRUNC('year', CURRENT_DATE) + INTERVAL '1 year'
        GROUP BY ti.product_id, t.branch_id
    ),
    DeliverySales AS (
        SELECT
            oi.product_id,
            o.branch_id,
            SUM(oi.quantity)::int AS sold
        FROM order_items oi
        JOIN orders o ON o.id = oi.order_id
        WHERE o.order_status IN ('delivered', 'completed')
          AND EXISTS (SELECT 1 FROM order_payments op WHERE op.order_id = o.id AND op.payment_status = 'paid')
          AND o.placed_at >= DATE_TRUNC('year', CURRENT_DATE)
          AND o.placed_at < DATE_TRUNC('year', CURRENT_DATE) + INTERVAL '1 year'
        GROUP BY oi.product_id, o.branch_id
    )
    SELECT
        p.product_name AS product,
        json_agg(
            json_build_object(
                'branch', b.branch_name,
                'sold', COALESCE(
                    CASE WHEN b.branch_name ILIKE '%Central%' THEN o.sold
                    ELSE s.sold END,
                0)
            )
            ORDER BY b.branch_name
        ) AS branches
    FROM products p
    CROSS JOIN branches b
    LEFT JOIN StoreSales s ON s.product_id = p.id AND s.branch_id = b.id
    LEFT JOIN DeliverySales o ON o.product_id = p.id AND o.branch_id = b.id
    GROUP BY p.id, p.product_name
    ORDER BY p.product_name;
`;
