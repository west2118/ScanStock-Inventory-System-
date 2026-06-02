// Get Dashboard Summary Stats Cards
export const getDashboardSummaryStatsService = async (client, branchId) => {
  const result = await client.query(
    `
    WITH today AS (
      SELECT
        COALESCE(
          SUM(
            CASE 
              WHEN type = 'IN' THEN quantity 
              ELSE 0 
            END
          ), 0
        ) AS stockIn,

        COALESCE(
          SUM(
            CASE 
              WHEN type = 'OUT' THEN quantity 
              ELSE 0 
            END
          ), 0
        ) AS stockOut

      FROM stock_movements

      WHERE branch_id = $1
        AND created_at >= CURRENT_DATE
        AND created_at < CURRENT_DATE + INTERVAL '1 day'
    ),

    yesterday AS (
      SELECT
        COALESCE(
          SUM(
            CASE 
              WHEN type = 'IN' THEN quantity 
              ELSE 0 
            END
          ), 0
        ) AS stockIn,

        COALESCE(
          SUM(
            CASE 
              WHEN type = 'OUT' THEN quantity 
              ELSE 0 
            END
          ), 0
        ) AS stockOut

      FROM stock_movements

      WHERE branch_id = $1
        AND created_at >= CURRENT_DATE - INTERVAL '1 day'
        AND created_at < CURRENT_DATE
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
      t.stockIn AS "stockInToday",
      t.stockOut AS "stockOutToday",

      (t.stockIn - y.stockIn) AS "differenceChangeStockIn",

      (t.stockOut - y.stockOut) AS "differenceChangeStockOut",

      i."availableStock",
      i."lowStocks"

    FROM today t
    CROSS JOIN yesterday y
    CROSS JOIN inventory i;
    `,
    [branchId],
  );

  return result.rows[0];
};

export const getDashboardChartsService = async (client, branchId) => {
  const result = await client.query(
    `
     WITH days AS (
        SELECT generate_series(
          CURRENT_DATE - INTERVAL '6 days',
          CURRENT_DATE,
          INTERVAL '1 day'
        )::date AS day
      ),

      weekly_stock AS (
        SELECT
          TO_CHAR(d.day, 'Dy') AS label,
          TO_CHAR(d.day, 'Mon DD, YYYY') AS date,
          COALESCE(SUM(CASE WHEN type = 'IN' THEN quantity ELSE 0 END), 0) AS "value1",
          COALESCE(SUM(CASE WHEN type = 'OUT' THEN quantity ELSE 0 END), 0) AS "value2"
        FROM days d
        LEFT JOIN stock_movements sm
          ON sm.created_at >= d.day
          AND sm.created_at < d.day + INTERVAL '1 day'
          AND sm.branch_id = $1
        GROUP BY d.day
        ORDER BY d.day
      ),

      stock_category AS (
        SELECT
          p.category AS name,
          COALESCE(SUM(bi.stock), 0) AS value1
        FROM products p
        LEFT JOIN branch_inventory bi
          ON bi.product_id = p.id
          AND bi.branch_id = $1
        GROUP BY p.category
        ORDER BY p.category
      ),
      
      best_selling AS (
        SELECT
          p.product_name AS name,
          SUM(sm.quantity) AS value
        FROM stock_movements sm
        JOIN products p ON p.id = sm.product_id
        WHERE branch_id = $1
          AND sm.type = 'OUT'
          AND sm.created_at >= CURRENT_DATE - INTERVAL '6 days'
          AND sm.created_at < CURRENT_DATE + INTERVAL '1 day'
        GROUP BY p.product_name
        ORDER BY value DESC
        LIMIT 10
      ),

      net_change AS (
        SELECT
          TO_CHAR(d.day, 'Dy') AS label,
          TO_CHAR(d.day, 'Mon DD, YYYY') AS date,
          ABS(
            COALESCE(
              SUM(CASE WHEN sm.type = 'IN' THEN sm.quantity ELSE 0 END) -
              SUM(CASE WHEN sm.type = 'OUT' THEN sm.quantity ELSE 0 END),
              0
            )
          ) AS value
        FROM days d
        LEFT JOIN stock_movements sm
          ON sm.created_at >= d.day
          AND sm.created_at < d.day + INTERVAL '1 day'
          AND sm.branch_id = $1
        GROUP BY d.day
        ORDER BY d.day
      ),
      
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
          sm.type,
          sm.quantity,
          sm.created_at AS "createdAt",
          u.name AS "handledBy"
        FROM stock_movements sm
        LEFT JOIN products p ON sm.product_id = p.id
        LEFT JOIN users u ON sm.handled_by = u.id
        WHERE sm.branch_id = $1
        ORDER BY sm.created_at DESC
        LIMIT 6
      )

      SELECT json_build_object(
        'dateRange',
        TO_CHAR(CURRENT_DATE - INTERVAL '6 days', 'Mon DD') || ' - ' ||
        TO_CHAR(CURRENT_DATE, 'Mon DD, YYYY'),

        'weeklyStockMovement',
        COALESCE(
          (SELECT json_agg(weekly_stock) FROM weekly_stock),
          '[]'::json
        ),

        'stockCategory',
        COALESCE(
          (SELECT json_agg(stock_category) FROM stock_category),
          '[]'::json
        ),

        'bestSellingProducts',
        COALESCE(
          (SELECT json_agg(best_selling) FROM best_selling),
          '[]'::json
        ),

        'netChange',
        COALESCE(
          (SELECT json_agg(net_change) FROM net_change),
          '[]'::json
        ),

        'lowStock',
        COALESCE(
          (SELECT json_agg(low_stock) FROM low_stock),
          '[]'::json
        ),

        'recentMovements',
        COALESCE(
          (SELECT json_agg(recent_movements) FROM recent_movements),
          '[]'::json
        )
      ) AS data;
    `,
    [branchId],
  );

  const chartResult = result.rows[0];

  return chartResult.data;
};
