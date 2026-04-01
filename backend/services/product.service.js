import pool from "../config/db.js";

// CREATE PRODUCT
export const createProductService = async (data) => {
  const {
    sku,
    barcode,
    product_name,
    price,
    category,
    location,
    vat_type,

    stock,
    stock_low,
    stock_critical,
    stock_high,
  } = data;

  const query = `
    INSERT INTO products (
      sku, barcode, product_name, price, category, location,
      vat_type, stock, stock_low, stock_critical, stock_high
    )
    VALUES (
      $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11
    )
    RETURNING *;
  `;

  const values = [
    sku,
    barcode,
    product_name,
    price,
    category,
    location,
    vat_type || "vatable",
    stock || 0,
    stock_low || 10,
    stock_critical || 5,
    stock_high || 20,
  ];

  const { rows } = await pool.query(query, values);
  return rows[0];
};

// UPDATE PRODUCT
export const updateProductService = async (id, data) => {
  const {
    sku,
    barcode,
    product_name,
    price,
    category,
    location,
    vat_type,
    stock,
    stock_low,
    stock_critical,
    stock_high,
  } = data;

  const query = `
    UPDATE products
    SET
      sku = $1,
      barcode = $2,
      product_name = $3,
      price = $4,
      category = $5,
      location = $6,
      vat_type = $7,
      stock = $8,
      stock_low = $9,
      stock_critical = $10,
      stock_high = $11,
      updated_at = NOW()
    WHERE id = $12
    RETURNING *;
  `;

  const values = [
    sku,
    barcode,
    product_name,
    price,
    category,
    location,
    vat_type,
    stock,
    stock_low,
    stock_critical,
    stock_high,
    id,
  ];

  const { rows } = await pool.query(query, values);
  return rows[0];
};

// DELETE PRODUCT
export const deleteProductService = async (id) => {
  const query = `
    UPDATE products
    SET status = 'archived'
    WHERE id = $1
    RETURNING *;
  `;

  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

// GET PRODUCTS
export const getProductsService = async ({
  page = 1,
  limit = 10,
  search = "",
  status = "",
  category = "",
}) => {
  const offset = (page - 1) * limit;

  const conditions = [`status <> 'archived'`];
  const values = [];
  let idx = 1;

  /* -------------------- SEARCH -------------------- */
  if (search) {
    conditions.push(`
      (
        product_name ILIKE $${idx}
        OR sku ILIKE $${idx}
        OR barcode ILIKE $${idx}
        OR category ILIKE $${idx}
      )
    `);
    values.push(`%${search}%`);
    idx++;
  }

  /* -------------------- STATUS FILTER -------------------- */
  if (status) {
    conditions.push(`status = $${idx}`);
    values.push(status);
    idx++;
  }

  /* -------------------- CATEGORY FILTER -------------------- */
  if (category) {
    conditions.push(`category = $${idx}`);
    values.push(category);
    idx++;
  }

  const whereClause = `WHERE ${conditions.join(" AND ")}`;

  /* -------------------- TOTAL COUNT -------------------- */
  const totalResult = await pool.query(
    `
    SELECT COUNT(*)::int AS total
    FROM products
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
      id,
      sku,
      barcode,
      product_name AS "productName",
      price,
      category,
      status,
      location,
      vat_type AS "vatType",
      stock,
      stock_low AS "stockLow",
      stock_critical AS "stockCritical",
      stock_high AS "stockHigh",
      created_at AS "createdAt",
      updated_at AS "updatedAt"
    FROM products
    ${whereClause}
    ORDER BY created_at DESC
    LIMIT $${idx} OFFSET $${idx + 1}
    `,
    [...values, limit, offset],
  );

  return {
    products: result.rows,
    page,
    total,
    totalPages,
  };
};

// FIND PRODUCT
export const findProductByBarcodeService = async (barcode) => {
  const query = `
    SELECT 
      id,
      sku,
      barcode,
      product_name AS "productName",
      price,
      category,
      location,
      vat_type AS "vatType",
      stock,
      stock_low AS "stockLow",
      stock_critical AS "stockCritical",
      stock_high AS "stockHigh",
      created_at AS "createdAt",
      updated_at AS "updatedAt"
    FROM products
    WHERE barcode = $1
    LIMIT 1;
  `;

  const { rows } = await pool.query(query, [barcode]);

  return rows[0];
};

export const productSummaryStatsService = async () => {
  const query = `
    SELECT
      (SELECT COUNT(*) FROM products WHERE status <> 'archived') AS "totalProducts",
      (SELECT COUNT(DISTINCT category) FROM products WHERE status <> 'archived') AS "totalCategories",
      (
        SELECT COUNT(*)
        FROM products p
        WHERE p.status <> 'archived'
          AND NOT EXISTS (
            SELECT 1
            FROM stock_movements sm
            WHERE sm.product_id = p.id
            AND sm.type = 'OUT'
            AND sm.created_at >= NOW() - INTERVAL '7 days'
          )
      ) AS "noSalesLast7Days",
      (
        SELECT COUNT(*)
        FROM products
        WHERE status <> 'archived'
          AND stock <= stock_low
      ) AS "lowStockProducts"
  `;

  const { rows } = await pool.query(query);

  return rows[0];
};

export const findProductByIdService = async (id) => {
  const query = `
      SELECT 
        id,
        sku,
        barcode,
        product_name AS "productName",
        price,
        category,
        status,
        location,
        vat_type AS "vatType",
        stock,
        stock_low AS "stockLow",
        stock_critical AS "stockCritical",
        stock_high AS "stockHigh",
        created_at AS "createdAt",
        updated_at AS "updatedAt"
      FROM products
      WHERE id = $1
    `;

  const { rows } = await pool.query(query, [id]);

  return rows[0];
};

export const updateProductStockService = async ({
  id,
  action,
  quantity,
  notes,
  handledBy, // ✅ REQUIRED
  price, // ✅ REQUIRED
}) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // 🔍 Get current product
    const productRes = await client.query(
      `SELECT id, stock FROM products 
       WHERE id = $1 AND status <> 'archived'`,
      [id],
    );

    if (productRes.rowCount === 0) {
      await client.query("ROLLBACK");
      return null;
    }

    const product = productRes.rows[0];

    const beforeStock = product.stock; // ✅ capture before
    let afterStock = beforeStock;

    // 🔥 Compute new stock
    if (action === "IN") {
      afterStock += quantity;
    } else if (action === "OUT") {
      if (quantity > beforeStock) {
        throw new Error("Insufficient stock");
      }
      afterStock -= quantity;
    } else {
      throw new Error("Invalid action type");
    }

    // 📝 Update product stock
    const updateRes = await client.query(
      `
      UPDATE products
      SET stock = $1,
          updated_at = NOW()
      WHERE id = $2
      RETURNING *
      `,
      [afterStock, id],
    );

    // 📦 Log movement (FIXED)
    await client.query(
      `
      INSERT INTO stock_movements (
        handled_by,
        product_id,
        type,
        quantity,
        price,
        before_stock,
        after_stock,
        reference
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `,
      [
        handledBy,
        id,
        action,
        quantity,
        price,
        beforeStock, // ✅ correct before
        afterStock, // ✅ correct after
        notes || null,
      ],
    );

    await client.query("COMMIT");

    return updateRes.rows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};
