import { summaryQuery, topPerformingQuery, needsImprovementQuery, monthlySalesOverviewQuery, inventoryDistributionQuery, employeeProductivityOverviewQuery, branchPerformanceQuery } from "../utils/queries/dashboard.queries.js";

// Get Dashboard Summary Stats Cards
export const getDashboardSummaryStatsService = async (client, branchId) => {
  const result = await client.query(
    `
    WITH today_pos AS (
      SELECT 
        (SELECT COALESCE(SUM(total_amount), 0) FROM transactions WHERE branch_id = $1 AND status = 'completed' AND created_at >= CURRENT_DATE AND created_at < CURRENT_DATE + INTERVAL '1 day') AS revenue,
        (SELECT COALESCE(SUM(quantity), 0) FROM transaction_items ti JOIN transactions t ON ti.transaction_id = t.id WHERE t.branch_id = $1 AND t.status = 'completed' AND t.created_at >= CURRENT_DATE AND t.created_at < CURRENT_DATE + INTERVAL '1 day') AS items_sale
    ),

    today_orders AS (
      SELECT 
        (SELECT COALESCE(SUM(total_amount), 0) FROM orders WHERE branch_id = $1 AND order_status IN ('delivered', 'completed') AND EXISTS (SELECT 1 FROM order_payments op WHERE op.order_id = orders.id AND op.payment_status = 'paid') AND placed_at >= CURRENT_DATE AND placed_at < CURRENT_DATE + INTERVAL '1 day') AS revenue,
        (SELECT COALESCE(SUM(quantity), 0) FROM order_items oi JOIN orders o ON oi.order_id = o.id WHERE o.branch_id = $1 AND o.order_status IN ('delivered', 'completed') AND EXISTS (SELECT 1 FROM order_payments op WHERE op.order_id = o.id AND op.payment_status = 'paid') AND o.placed_at >= CURRENT_DATE AND o.placed_at < CURRENT_DATE + INTERVAL '1 day') AS items_sale
    ),

    yesterday_pos AS (
      SELECT 
        (SELECT COALESCE(SUM(total_amount), 0) FROM transactions WHERE branch_id = $1 AND status = 'completed' AND created_at >= CURRENT_DATE - INTERVAL '1 day' AND created_at < CURRENT_DATE) AS revenue,
        (SELECT COALESCE(SUM(quantity), 0) FROM transaction_items ti JOIN transactions t ON ti.transaction_id = t.id WHERE t.branch_id = $1 AND t.status = 'completed' AND t.created_at >= CURRENT_DATE - INTERVAL '1 day' AND t.created_at < CURRENT_DATE) AS items_sale
    ),

    yesterday_orders AS (
      SELECT 
        (SELECT COALESCE(SUM(total_amount), 0) FROM orders WHERE branch_id = $1 AND order_status IN ('delivered', 'completed') AND EXISTS (SELECT 1 FROM order_payments op WHERE op.order_id = orders.id AND op.payment_status = 'paid') AND placed_at >= CURRENT_DATE - INTERVAL '1 day' AND placed_at < CURRENT_DATE) AS revenue,
        (SELECT COALESCE(SUM(quantity), 0) FROM order_items oi JOIN orders o ON oi.order_id = o.id WHERE o.branch_id = $1 AND o.order_status IN ('delivered', 'completed') AND EXISTS (SELECT 1 FROM order_payments op WHERE op.order_id = o.id AND op.payment_status = 'paid') AND o.placed_at >= CURRENT_DATE - INTERVAL '1 day' AND o.placed_at < CURRENT_DATE) AS items_sale
    ),

    inventory AS (
      SELECT 
        COALESCE(SUM(stock), 0)::int AS "availableStock",

        COUNT(
          CASE 
            WHEN stock > 0 
            AND stock <= stock_low
            THEN 1
          END
        )::int AS "lowStocks"

      FROM branch_inventory

      WHERE branch_id = $1
    )

    SELECT
      (tp.revenue + to_ord.revenue)::numeric AS "revenueToday",
      (tp.items_sale + to_ord.items_sale)::int AS "itemsSaleToday",

      ((tp.revenue + to_ord.revenue) - (yp.revenue + yo.revenue))::numeric AS "differenceChangeRevenue",
      ((tp.items_sale + to_ord.items_sale) - (yp.items_sale + yo.items_sale))::int AS "differenceChangeItemsSale",

      i."availableStock",
      i."lowStocks"

    FROM today_pos tp
    CROSS JOIN today_orders to_ord
    CROSS JOIN yesterday_pos yp
    CROSS JOIN yesterday_orders yo
    CROSS JOIN inventory i;
    `,
    [branchId],
  );

  return result.rows[0];
};

export const getDashboardChartsService = async (client, branchId) => {
  const branchRes = await client.query(
    'SELECT branch_name FROM branches WHERE id = $1',
    [branchId]
  );
  const isCentral = branchRes.rows[0]?.branch_name?.toLowerCase() === 'central warehouse' || branchRes.rows[0]?.branch_name?.toLowerCase().includes('central');

  let salesTrendsCTE = '';
  let revenueCategoryCTE = '';
  let bestSellingCTE = '';
  let orderStatusDistributionCTE = '';

  if (isCentral) {
    salesTrendsCTE = `
      sales_trends AS (
        SELECT
          TO_CHAR(d.day, 'Dy') AS label,
          TO_CHAR(d.day, 'Mon DD, YYYY') AS date,
          COALESCE(SUM(o.total_amount), 0)::numeric AS "value1",
          COUNT(o.id)::numeric AS "value2"
        FROM days d
        LEFT JOIN orders o
          ON o.placed_at >= d.day
          AND o.placed_at < d.day + INTERVAL '1 day'
          AND o.branch_id = $1
          AND o.order_status IN ('delivered', 'completed')
          AND EXISTS (
            SELECT 1 FROM order_payments op
            WHERE op.order_id = o.id
            AND op.payment_status = 'paid'
          )
        GROUP BY d.day
        ORDER BY d.day
      ),
    `;

    revenueCategoryCTE = `
      revenue_category AS (
        SELECT
          c.name AS name,
          COALESCE(SUM(o.total_amount), 0)::numeric AS value1
        FROM order_items oi
        JOIN orders o ON o.id = oi.order_id
        JOIN products p ON p.id = oi.product_id
        JOIN categories c ON c.id = p.category_id
        WHERE o.branch_id = $1
          AND o.placed_at >= CURRENT_DATE - INTERVAL '6 days'
          AND o.placed_at < CURRENT_DATE + INTERVAL '1 day'
          AND o.order_status IN ('delivered', 'completed')
          AND EXISTS (
            SELECT 1 FROM order_payments op
            WHERE op.order_id = o.id
            AND op.payment_status = 'paid'
          )
        GROUP BY c.name
        ORDER BY value1 DESC
      ),
    `;

    bestSellingCTE = `
      best_selling AS (
        SELECT
          p.product_name AS name,
          SUM(oi.quantity)::numeric AS value
        FROM order_items oi
        JOIN orders o ON o.id = oi.order_id
        JOIN products p ON p.id = oi.product_id
        WHERE o.branch_id = $1
          AND o.placed_at >= CURRENT_DATE - INTERVAL '6 days'
          AND o.placed_at < CURRENT_DATE + INTERVAL '1 day'
          AND o.order_status IN ('delivered', 'completed')
          AND EXISTS (
            SELECT 1 FROM order_payments op
            WHERE op.order_id = o.id
            AND op.payment_status = 'paid'
          )
        GROUP BY p.product_name
        ORDER BY value DESC
        LIMIT 10
      ),
    `;

    orderStatusDistributionCTE = `
      order_status_distribution AS (
        SELECT
          TO_CHAR(d.day, 'Dy') AS label,
          TO_CHAR(d.day, 'Mon DD, YYYY') AS date,
          COUNT(CASE WHEN o.order_status = 'pending' THEN 1 END)::numeric AS pending,
          COUNT(CASE WHEN o.order_status = 'processing' THEN 1 END)::numeric AS processing,
          COUNT(CASE WHEN o.order_status = 'shipped' THEN 1 END)::numeric AS shipped,
          COUNT(CASE WHEN o.order_status = 'delivered' THEN 1 END)::numeric AS delivered
        FROM next_days d
        LEFT JOIN orders o
          ON o.placed_at >= d.day
          AND o.placed_at < d.day + INTERVAL '1 day'
          AND o.branch_id = $1
        GROUP BY d.day
        ORDER BY d.day
      ),
    `;
  } else {
    salesTrendsCTE = `
      sales_trends AS (
        SELECT
          TO_CHAR(d.day, 'Dy') AS label,
          TO_CHAR(d.day, 'Mon DD, YYYY') AS date,
          COALESCE(SUM(t.total_amount), 0)::numeric AS "value1",
          COUNT(t.id)::numeric AS "value2"
        FROM days d
        LEFT JOIN transactions t
          ON t.created_at >= d.day
          AND t.created_at < d.day + INTERVAL '1 day'
          AND t.branch_id = $1
          AND t.status = 'completed'
        GROUP BY d.day
        ORDER BY d.day
      ),
    `;

    revenueCategoryCTE = `
      revenue_category AS (
        SELECT
          c.name AS name,
          COALESCE(SUM(ti.subtotal), 0)::numeric AS value1
        FROM transaction_items ti
        JOIN transactions t ON t.id = ti.transaction_id
        JOIN products p ON p.id = ti.product_id
        JOIN categories c ON c.id = p.category_id
        WHERE t.branch_id = $1
          AND t.created_at >= CURRENT_DATE - INTERVAL '6 days'
          AND t.created_at < CURRENT_DATE + INTERVAL '1 day'
          AND t.status = 'completed'
        GROUP BY c.name
        ORDER BY value1 DESC
      ),
    `;

    bestSellingCTE = `
      best_selling AS (
        SELECT
          p.product_name AS name,
          SUM(ti.quantity)::numeric AS value
        FROM transaction_items ti
        JOIN transactions t ON t.id = ti.transaction_id
        JOIN products p ON p.id = ti.product_id
        WHERE t.branch_id = $1
          AND t.created_at >= CURRENT_DATE - INTERVAL '6 days'
          AND t.created_at < CURRENT_DATE + INTERVAL '1 day'
          AND t.status = 'completed'
        GROUP BY p.product_name
        ORDER BY value DESC
        LIMIT 10
      ),
    `;

    orderStatusDistributionCTE = `
      order_status_distribution AS (
        SELECT
          TO_CHAR(d.day, 'Dy') AS label,
          TO_CHAR(d.day, 'Mon DD, YYYY') AS date,
          COALESCE(SUM(ti.quantity), 0)::numeric AS pending
        FROM days d
        LEFT JOIN transactions t
          ON t.created_at >= d.day
          AND t.created_at < d.day + INTERVAL '1 day'
          AND t.branch_id = $1
          AND t.status = 'completed'
        LEFT JOIN transaction_items ti ON ti.transaction_id = t.id
        GROUP BY d.day
        ORDER BY d.day
      ),
    `;
  }

  const query = `
    WITH days AS (
      SELECT generate_series(
        CURRENT_DATE - INTERVAL '6 days',
        CURRENT_DATE,
        INTERVAL '1 day'
      )::date AS day
    ),
    next_days AS (
      SELECT generate_series(
        CURRENT_DATE,
        CURRENT_DATE + INTERVAL '6 days',
        INTERVAL '1 day'
      )::date AS day
    ),
    ${salesTrendsCTE}
    ${revenueCategoryCTE}
    ${bestSellingCTE}
    ${orderStatusDistributionCTE}
    low_stock AS (
      SELECT
        p.id,
        p.sku,
        p.product_name AS "productName",
        COALESCE(bi.stock, 0) AS stock,
        COALESCE(bi.stock_low, 0) AS "stockLow",
        COALESCE(bi.stock_critical, 0) AS "stockCritical"
      FROM products p
      LEFT JOIN branch_inventory bi
        ON bi.product_id = p.id
        AND bi.branch_id = $1
      WHERE COALESCE(bi.stock, 0)
        <= COALESCE(bi.stock_low, 0)
      ORDER BY stock ASC
      LIMIT 5
    ),
    recent_movements AS (
      SELECT
        sm.id,
        p.product_name AS "productName",
        sm.movement_type AS type,
        sm.quantity,
        sm.created_at AS "createdAt",
        CONCAT(u.first_name, ' ', u.last_name) AS "handledBy"
      FROM stock_movements sm
      LEFT JOIN products p ON sm.product_id = p.id
      LEFT JOIN users u ON sm.handled_by = u.id
      WHERE sm.branch_id = $1
      ORDER BY sm.created_at DESC
      LIMIT 5
    )

    SELECT json_build_object(
      'dateRange',
      TO_CHAR(CURRENT_DATE - INTERVAL '6 days', 'Mon DD') || ' - ' ||
      TO_CHAR(CURRENT_DATE, 'Mon DD, YYYY'),

      'salesTrends',
      COALESCE((SELECT json_agg(sales_trends) FROM sales_trends), '[]'::json),

      'revenueCategory',
      COALESCE((SELECT json_agg(revenue_category) FROM revenue_category), '[]'::json),

      'bestSellingProducts',
      COALESCE((SELECT json_agg(best_selling) FROM best_selling), '[]'::json),

      'orderStatusDistribution',
      COALESCE((SELECT json_agg(order_status_distribution) FROM order_status_distribution), '[]'::json),

      'lowStock',
      COALESCE((SELECT json_agg(low_stock) FROM low_stock), '[]'::json),

      'recentMovements',
      COALESCE((SELECT json_agg(recent_movements) FROM recent_movements), '[]'::json)
    ) AS data;
  `;

  const result = await client.query(query, [branchId]);
  return result.rows[0].data;
};

export const getDashboardDataService = async (client) => {
  const [
    summaryResult,
    topPerformingResult,
    needsImprovementResult,
    monthlySalesOverviewResult,
    inventoryDistributionResult,
    branchPerformanceResult,
    employeeProductivityOverviewResult,
  ] = await Promise.all([
    client.query(summaryQuery),
    client.query(topPerformingQuery),
    client.query(needsImprovementQuery),
    client.query(monthlySalesOverviewQuery),
    client.query(inventoryDistributionQuery),
    client.query(branchPerformanceQuery),
    client.query(employeeProductivityOverviewQuery),
  ]);

  return {
    summaryStats: summaryResult.rows[0],
    topPerforming: topPerformingResult.rows[0],
    needsImprovement: needsImprovementResult.rows[0],
    monthlySalesOverview: monthlySalesOverviewResult.rows,
    inventoryDistribution: inventoryDistributionResult.rows,
    branchPerformance: branchPerformanceResult.rows,
    employeeProductivityOverview: employeeProductivityOverviewResult.rows,
  };
};
