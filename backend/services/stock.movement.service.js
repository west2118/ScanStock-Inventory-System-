import pool from "../config/db.js";

export const createStockMovementService = async (data) => {
  const { handled_by, product_id, type, quantity, price, reference } = data;

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // 1. Get current stock
    const productRes = await client.query(
      `SELECT stock FROM products WHERE id = $1 FOR UPDATE`,
      [product_id],
    );

    if (productRes.rows.length === 0) {
      throw new Error("Product not found");
    }

    const currentStock = productRes.rows[0].stock;

    // 2. Compute new stock
    let newStock;

    if (type === "IN") {
      newStock = currentStock + quantity;
    } else if (type === "OUT") {
      if (currentStock < quantity) {
        throw new Error("Insufficient stock");
      }
      newStock = currentStock - quantity;
    } else {
      throw new Error("Invalid movement type");
    }

    // 3. Update product stock
    await client.query(
      `
      UPDATE products
      SET stock = $1, updated_at = NOW()
      WHERE id = $2
      `,
      [newStock, product_id],
    );

    // 4. Insert movement record
    const movementRes = await client.query(
      `
      INSERT INTO stock_movements (
        handled_by,
        product_id,
        reference,
        type,
        quantity,
        price,
        before_stock,
        after_stock
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING
        id,
        handled_by AS "handledBy",
        product_id AS "productId",
        reference,
        type,
        quantity,
        price,
        before_stock AS "beforeStock",
        after_stock AS "afterStock",
        created_at AS "createdAt"
      `,
      [
        handled_by,
        product_id,
        reference || null,
        type,
        quantity,
        price,
        currentStock,
        newStock,
      ],
    );

    await client.query("COMMIT");

    return movementRes.rows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

export const getStockMovementsService = async ({
  page = 1,
  limit = 10,
  search = "",
  category = "",
  type = "",
  branchId,
}) => {
  const offset = (page - 1) * limit;

  const conditions = [];
  const values = [branchId];
  let idx = 1;

  conditions.push(`sm.branch_id = $${idx}`);
  idx++;

  /* -------------------- SEARCH -------------------- */
  if (search) {
    conditions.push(`
      (
        p.product_name ILIKE $${idx}
        OR p.barcode ILIKE $${idx}
        OR p.category ILIKE $${idx}
        OR u.name ILIKE $${idx}
      )
    `);
    values.push(`%${search}%`);
    idx++;
  }

  /* -------------------- CATEGORY FILTER -------------------- */
  if (type) {
    conditions.push(`sm.type = $${idx}`);
    values.push(type);
    idx++;
  }

  if (category) {
    conditions.push(`p.category = $${idx}`);
    values.push(category);
    idx++;
  }

  const whereClause = conditions.length
    ? `WHERE ${conditions.join(" AND ")}`
    : "";

  /* -------------------- TOTAL COUNT -------------------- */
  const totalResult = await pool.query(
    `
    SELECT COUNT(*)::int AS total
    FROM stock_movements sm
    JOIN products p ON sm.product_id = p.id
    JOIN users u ON sm.handled_by = u.id
    ${whereClause}
    `,
    values,
  );

  const total = totalResult.rows[0].total;
  const totalPages = Math.ceil(total / limit);

  /* -------------------- DATA QUERY -------------------- */
  const result = await pool.query(
    `
    SELECT
      sm.id,
      sm.type,
      sm.quantity,
      sm.reference,
      sm.before_stock AS "beforeStock",
      sm.after_stock AS "afterStock",
      sm.created_at AS "createdAt",

      p.id AS "productId",
      p.product_name AS "productName",
      p.barcode,
      p.category,

      u.id AS "handledBy",
      u.name AS "handledByName",
      u.role AS "handledByRole"

    FROM stock_movements sm
    JOIN products p ON sm.product_id = p.id
    JOIN users u ON sm.handled_by = u.id

    ${whereClause}
    ORDER BY sm.created_at DESC
    LIMIT $${idx} OFFSET $${idx + 1}
    `,
    [...values, limit, offset],
  );

  return {
    movements: result.rows,
    page,
    total,
    totalPages,
  };
};

// Get Dashboard Summary Stats Cards
export const getDashboardSummaryCardsService = async (client, branchId) => {
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
        LIMIT 5
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

  return result.rows[0];
};

export const inventorySummaryStatsService = async (branchId) => {
  const query = `
    SELECT
      COUNT(*) FILTER (
        WHERE COALESCE(bi.stock, 0) > COALESCE(bi.stock_low, 0)
      ) AS "inStock",

      COUNT(*) FILTER (
        WHERE COALESCE(bi.stock, 0) <= COALESCE(bi.stock_low, 0)
        AND COALESCE(bi.stock, 0) > COALESCE(bi.stock_critical, 0)
      ) AS "lowStock",

      COUNT(*) FILTER (
        WHERE COALESCE(bi.stock, 0) <= COALESCE(bi.stock_critical, 0)
        AND COALESCE(bi.stock, 0) > 0
      ) AS "criticalStock",

      COUNT(*) FILTER (
        WHERE COALESCE(bi.stock, 0) = 0
      ) AS "outOfStock"

    FROM products p

    LEFT JOIN branch_inventory bi
      ON bi.product_id = p.id
      AND bi.branch_id = $1

    WHERE p.status <> 'archived';
  `;

  const { rows } = await pool.query(query, [branchId]);

  return rows[0];
};

export const inventoryMovementSummaryStatsService = async (branchId) => {
  const query = `
    SELECT
      COUNT(id) as "totalMovements",

      COUNT(*) FILTER (WHERE type = 'IN') AS "totalStockIn",

      COUNT(*) FILTER (WHERE type = 'OUT') AS "totalStockOut",

      COALESCE(
        SUM(CASE WHEN type = 'IN' THEN quantity ELSE 0 END) -
        SUM(CASE WHEN type = 'OUT' THEN quantity ELSE 0 END),
        0
      ) AS "totalNetChange"

    FROM stock_movements
      WHERE branch_id = $1
  `;

  const { rows } = await pool.query(query, [branchId]);

  return rows[0];
};

export const findStockMovementByIdService = async (id) => {
  const query = `
      SELECT
        sm.id,
        sm.type,
        sm.quantity,
        sm.reference,
        sm.before_stock AS "beforeStock",
        sm.after_stock AS "afterStock",
        sm.created_at AS "createdAt",

        p.id AS "productId",
        p.product_name AS "productName",
        p.barcode,
        p.category,

        u.id AS "handledBy",
        u.name AS "handledByName",
        u.role AS "handledByRole"

      FROM stock_movements sm
      JOIN products p ON sm.product_id = p.id
      JOIN users u ON sm.handled_by = u.id
      WHERE sm.id = $1
    `;

  const { rows } = await pool.query(query, [id]);

  return rows[0];
};
