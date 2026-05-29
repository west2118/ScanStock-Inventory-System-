import pool from "../config/db.js";

// CREATE PRODUCT
export const createProductService = async (data) => {
  const { sku, barcode, product_name, price, category, vat_type, status } =
    data;

  // Check if product name already exists
  const existingProduct = await pool.query(
    `SELECT * FROM products WHERE LOWER(product_name) = LOWER($1)`,
    [product_name],
  );

  if (existingProduct.rows.length > 0) {
    throw new Error("Product name already exists");
  }

  const query = `
    INSERT INTO products (
      sku, barcode, product_name, price, category, vat_type, status
    )
    VALUES (
      $1,$2,$3,$4,$5,$6,$7
    )
    RETURNING *;
  `;

  const values = [
    sku,
    barcode,
    product_name,
    price,
    category,
    vat_type || "vatable",
    status,
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
  branchId,
}) => {
  const offset = (page - 1) * limit;

  const conditions = [`p.status <> 'archived'`];

  const values = [branchId];

  // $1 is already branchId
  let idx = 2;

  /* -------------------- SEARCH -------------------- */
  if (search) {
    conditions.push(`
      (
        p.product_name ILIKE $${idx}
        OR p.sku ILIKE $${idx}
        OR p.barcode ILIKE $${idx}
        OR p.category ILIKE $${idx}
      )
    `);

    values.push(`%${search}%`);
    idx++;
  }

  /* -------------------- STATUS FILTER -------------------- */
  if (status) {
    conditions.push(`p.status = $${idx}`);
    values.push(status);
    idx++;
  }

  /* -------------------- CATEGORY FILTER -------------------- */
  if (category) {
    conditions.push(`p.category = $${idx}`);
    values.push(category);
    idx++;
  }

  const whereClause = `WHERE ${conditions.join(" AND ")}`;

  /* -------------------- TOTAL COUNT -------------------- */
  const totalResult = await pool.query(
    `
    SELECT COUNT(*)::int AS total
    FROM products p

    LEFT JOIN branch_inventory bi
      ON bi.product_id = p.id
      AND bi.branch_id = $1

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
      p.id,
      p.sku,
      p.barcode,
      p.product_name AS "productName",
      p.price,
      p.category,
      p.status,
      p.vat_type AS "vatType",

      bi.branch_id AS "branchId",
      bi.location,

      COALESCE(bi.stock, 0) AS stock,
      COALESCE(bi.stock_low, 0) AS "stockLow",
      COALESCE(bi.stock_critical, 0) AS "stockCritical",
      COALESCE(bi.stock_high, 0) AS "stockHigh",

      p.created_at AS "createdAt",
      p.updated_at AS "updatedAt"

    FROM products p

    LEFT JOIN branch_inventory bi
      ON bi.product_id = p.id
      AND bi.branch_id = $1

    ${whereClause}

    ORDER BY p.created_at DESC

    LIMIT $${idx}
    OFFSET $${idx + 1}
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
        FROM products p
        JOIN branch_inventory bi ON bi.product_id = p.id
        WHERE p.status <> 'archived'
          AND bi.stock <= stock_low
      ) AS "lowStockProducts"
  `;

  const { rows } = await pool.query(query);

  return rows[0];
};

export const findProductByIdService = async (id, branchId) => {
  const query = `
    SELECT 
      p.id,
      p.sku,
      p.barcode,
      p.product_name AS "productName",
      p.price,
      p.category,
      p.status,
      p.vat_type AS "vatType",

      bi.branch_id AS "branchId",
      bi.location,

      COALESCE(bi.stock, 0) AS stock,
      COALESCE(bi.stock_low, 0) AS "stockLow",
      COALESCE(bi.stock_critical, 0) AS "stockCritical",
      COALESCE(bi.stock_high, 0) AS "stockHigh",

      p.created_at AS "createdAt",
      p.updated_at AS "updatedAt"

    FROM products p

    LEFT JOIN branch_inventory bi
      ON bi.product_id = p.id
      AND bi.branch_id = $2

    WHERE p.id = $1
  `;

  const { rows } = await pool.query(query, [id, branchId]);

  return rows[0];
};

export const updateProductStockService = async ({
  client,
  id,
  branchId,
  action,
  quantity,
  notes,
  handledBy,
}) => {
  try {
    const inventoryRes = await client.query(
      `
      SELECT *
      FROM branch_inventory
      WHERE product_id = $1
      AND branch_id = $2
      `,
      [id, branchId],
    );

    let inventory;

    if (inventoryRes.rowCount === 0) {
      const createInventoryRes = await client.query(
        `
        INSERT INTO branch_inventory (
          branch_id,
          product_id,
          stock
        )
        VALUES ($1, $2, 0)
        RETURNING *
        `,
        [branchId, id],
      );

      inventory = createInventoryRes.rows[0];
    } else {
      inventory = inventoryRes.rows[0];
    }

    const beforeStock = inventory.stock;
    let afterStock = beforeStock;

    // 🔥 Compute stock
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

    // 📝 Update inventory stock
    const updateRes = await client.query(
      `
      UPDATE branch_inventory
      SET
        stock = $1,
        updated_at = NOW()
      WHERE product_id = $2
      AND branch_id = $3
      RETURNING *
      `,
      [afterStock, id, branchId],
    );

    // 📦 Log movement
    await client.query(
      `
      INSERT INTO stock_movements (
        handled_by,
        product_id,
        branch_id,
        type,
        quantity,
        before_stock,
        after_stock,
        reference
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `,
      [
        handledBy,
        id,
        branchId,
        action,
        quantity,
        beforeStock,
        afterStock,
        notes || null,
      ],
    );

    return updateRes.rows[0];
  } catch (error) {
    throw error;
  }
};

export const getProductsPOSService = async (branchId, search = "") => {
  console.log("BranchID: ", branchId);

  const values = [branchId];
  let idx = 2;

  const conditions = [`p.status = 'active'`];

  /* -------------------- SEARCH -------------------- */
  if (search) {
    conditions.push(`
      (
        p.product_name ILIKE $${idx}
        OR p.sku ILIKE $${idx}
        OR p.barcode ILIKE $${idx}
        OR p.category ILIKE $${idx}
      )
    `);

    values.push(`%${search}%`);
    idx++;
  }

  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  const result = await pool.query(
    `
    SELECT
      p.id,
      p.sku,
      p.barcode,
      p.product_name AS "productName",
      p.price,
      p.category,
      p.status,
      p.vat_type AS "vatType",

      bi.branch_id AS "branchId",
      bi.location,

      COALESCE(bi.stock, 0) AS stock,
      COALESCE(bi.stock_low, 0) AS "stockLow",
      COALESCE(bi.stock_critical, 0) AS "stockCritical",
      COALESCE(bi.stock_high, 0) AS "stockHigh",

      p.created_at AS "createdAt",
      p.updated_at AS "updatedAt"

    FROM products p
    LEFT JOIN branch_inventory bi
      ON bi.product_id = p.id
      AND bi.branch_id = $1

    ${whereClause}

    ORDER BY product_name ASC
    `,
    values,
  );

  return result.rows;
};
