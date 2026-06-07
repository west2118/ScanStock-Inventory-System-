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
  const values = [];
  let idx = 1;

  if (branchId) {
    conditions.push(`sm.branch_id = $${idx}`);
    values.push(branchId);
    idx++;
  }

  if (search) {
    conditions.push(`
      (
        p.product_name ILIKE $${idx}
        OR p.barcode ILIKE $${idx}
        OR p.sku ILIKE $${idx}
        OR c.name ILIKE $${idx}
        OR CONCAT(u.first_name, ' ', u.last_name) ILIKE $${idx}
      )
    `);

    values.push(`%${search}%`);
    idx++;
  }

  if (type) {
    conditions.push(`sm.movement_type = $${idx}`);
    values.push(type);
    idx++;
  }

  if (category) {
    conditions.push(`c.name = $${idx}`);
    values.push(category);
    idx++;
  }

  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  const totalResult = await pool.query(
    `
    SELECT COUNT(*)::int AS total
    FROM stock_movements sm
    JOIN products p ON sm.product_id = p.id
    LEFT JOIN categories c ON p.category_id = c.id
    JOIN users u ON sm.handled_by = u.id
    ${whereClause}
    `,
    values,
  );

  const total = totalResult.rows[0].total;
  const totalPages = Math.ceil(total / limit);

  const result = await pool.query(
    `
    SELECT
      sm.id,
      sm.movement_type AS "movementType",
      sm.quantity,
      sm.reference_type AS "referenceType",
      sm.reference_id AS "referenceId",
      sm.before_stock AS "beforeStock",
      sm.after_stock AS "afterStock",
      sm.created_at AS "createdAt",
      sm.remarks,

      p.id AS "productId",
      p.product_name AS "productName",
      p.sku,
      p.barcode,

      c.id AS "categoryId",
      c.name AS "categoryName",

      u.id AS "handledBy",
      CONCAT(u.first_name, ' ', u.last_name) AS "handledByName",
      u.role AS "handledByRole"

    FROM stock_movements sm
    JOIN products p ON sm.product_id = p.id
    LEFT JOIN categories c ON p.category_id = c.id
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
    limit,
    total,
    totalPages,
  };
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
