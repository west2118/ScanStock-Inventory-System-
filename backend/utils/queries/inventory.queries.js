export const inventorySummaryQuery = `
  SELECT 
    (
      SELECT COALESCE(SUM(bi.stock * p.price), 0)
      FROM branch_inventory bi
      JOIN products p ON p.id = bi.product_id
      WHERE p.status <> 'archived'
    )::int AS "totalInventoryValue",

    (
      SELECT COALESCE(SUM(bi.stock), 0)
      FROM branch_inventory bi
      JOIN products p ON p.id = bi.product_id
      WHERE p.status <> 'archived'
    )::int AS "totalStocks",

    (
      SELECT COUNT(*)
      FROM branch_inventory bi
      JOIN products p ON p.id = bi.product_id
      WHERE bi.stock <= bi.stock_low
        AND p.status <> 'archived'
    )::int AS "lowStockCount",
     
    (
        (
            SELECT COALESCE(SUM(ti.quantity * ti.price), 0)
            FROM transaction_items ti
            JOIN transactions t ON t.id = ti.transaction_id
            WHERE t.created_at >= DATE_TRUNC('year', CURRENT_DATE)
                AND t.created_at < DATE_TRUNC('year', CURRENT_DATE) + INTERVAL '1 year'
                AND t.status <> 'voided'
                AND t.payment_status = 'paid'
        )
        /
        NULLIF(
            (
                SELECT COALESCE(SUM(bi.stock * p.price), 0)
                FROM branch_inventory bi
                JOIN products p ON p.id = bi.product_id
                WHERE p.status <> 'archived'
            ),
            0
        )
    )::numeric(10,1) AS "inventoryTurnover"
`;

export const inventoryLevelsByBranchQuery = `
  SELECT
    b.id,
    b.branch_name AS "name",

    COALESCE(SUM(bi.stock), 0)::int AS "totalStocks",

    COUNT(
      CASE
        WHEN bi.stock <= bi.stock_low THEN 1
      END
    )::int AS "lowStock"

  FROM branches b
  LEFT JOIN branch_inventory bi
    ON bi.branch_id = b.id
  LEFT JOIN products p
    ON p.id = bi.product_id
    AND p.status <> 'archived'

  GROUP BY b.id, b.branch_name
  ORDER BY "totalStocks" DESC
`;

export const inventoryByCategoryQuery = `
  SELECT
    c.name AS name,

    COALESCE(SUM(bi.stock), 0)::int AS "value",

    COALESCE(
      SUM(bi.stock * p.price),
      0
    )::numeric(12,2) AS "value2"

  FROM products p
  LEFT JOIN categories c ON c.id = p.category_id
  LEFT JOIN branch_inventory bi
    ON bi.product_id = p.id

  WHERE p.status <> 'archived'

  GROUP BY c.name
  ORDER BY "value2" DESC
`;

export const stockMovementsMonthlyQuery = `
  WITH months AS (
    SELECT
      generate_series(
        DATE_TRUNC('year', CURRENT_DATE),
        DATE_TRUNC('year', CURRENT_DATE) + INTERVAL '11 months',
        INTERVAL '1 month'
      ) AS month_start
  )

  SELECT
    TO_CHAR(m.month_start, 'Mon') AS month,

    COALESCE(
      SUM(
        CASE
          WHEN sm.movement_type = 'IN' THEN sm.quantity
          ELSE 0
        END
      ),
      0
    )::int AS "stockIn",

    COALESCE(
      SUM(
        CASE
          WHEN sm.movement_type = 'OUT' THEN sm.quantity
          ELSE 0
        END
      ),
      0
    )::int AS "stockOut"

  FROM months m
  LEFT JOIN stock_movements sm
    ON DATE_TRUNC('month', sm.created_at) = m.month_start

  GROUP BY m.month_start
  ORDER BY m.month_start
`;

export const inventoryValueByBranchQuery = `
  SELECT
    b.branch_name AS name,

    COALESCE(
      SUM(bi.stock * p.price),
      0
    )::numeric(12,2) AS "value"

  FROM branches b
  LEFT JOIN branch_inventory bi
    ON bi.branch_id = b.id
  LEFT JOIN products p
    ON p.id = bi.product_id
    AND p.status <> 'archived'

  GROUP BY b.id, b.branch_name
  ORDER BY "value" DESC
`;

export const productInventoryStatusQuery = `
  WITH ProductBranches AS (
    SELECT p.id AS product_id, p.product_name, p.sku, c.name AS category, b.id AS branch_id, b.branch_name
    FROM products p
    CROSS JOIN branches b
    LEFT JOIN categories c ON c.id = p.category_id
    WHERE p.status <> 'archived'
  )
  SELECT
    pb.product_id AS id,
    pb.product_name AS "productName",
    pb.category,
    pb.sku,

    COALESCE(SUM(bi.stock), 0)::int AS "totalStock",

    json_agg(
        json_build_object(
        'branch', pb.branch_name,
        'stock', COALESCE(bi.stock, 0),
        'status',
            CASE
            WHEN COALESCE(bi.stock, 0) = 0 THEN 'Out of Stock'
            WHEN bi.stock <= bi.stock_critical THEN 'Critical Stock'
            WHEN bi.stock <= bi.stock_low THEN 'Low Stock'
            WHEN bi.stock >= bi.stock_high THEN 'High Stock'
            ELSE 'In Stock'
            END
        )
        ORDER BY pb.branch_name
    ) AS branches

  FROM ProductBranches pb
  LEFT JOIN branch_inventory bi
    ON bi.product_id = pb.product_id AND bi.branch_id = pb.branch_id

  GROUP BY
    pb.product_id,
    pb.product_name,
    pb.category,
    pb.sku

  ORDER BY pb.product_name
`;
