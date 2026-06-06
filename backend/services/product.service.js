import pool from "../config/db.js";

// CREATE PRODUCT
export const createProductService = async (data) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const existingProduct = await client.query(
      `
        SELECT id
        FROM products
        WHERE LOWER(product_name) = LOWER($1)
          AND brand_id = $2
        LIMIT 1
      `,
      [data.productName, data.brandId],
    );

    if (existingProduct.rowCount > 0) {
      const error = new Error("Product already exists for this brand");
      error.statusCode = 409;
      throw error;
    }

    const productResult = await client.query(
      `
      INSERT INTO products (
        sku,
        barcode,
        slug,
        product_name,
        short_description,
        description,
        features,
        price,
        status,
        category_id,
        brand_id,
        vat_type
      )
      VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12
      )
      RETURNING *
      `,
      [
        data.sku,
        data.barcode,
        data.slug,
        data.productName,
        data.shortDescription,
        data.description,
        data.features,
        data.price,
        data.status ?? "active",
        data.categoryId,
        data.brandId,
        data.vatType ?? "vatable",
      ],
    );

    const product = productResult.rows[0];

    if (data.specifications.length > 0) {
      for (const specification of data.specifications) {
        await client.query(
          `
          INSERT INTO product_specifications (
            product_id,
            name,
            value
          )
          VALUES ($1,$2,$3)
          `,
          [product.id, specification.name, specification.value],
        );
      }
    }

    if (data.images.length > 0) {
      for (const image of data.images) {
        await client.query(
          `
          INSERT INTO product_images (
            product_id,
            image_url,
            sort_order,
            is_primary
          )
          VALUES ($1,$2,$3,$4)
          `,
          [
            product.id,
            image.imageUrl,
            image.sortOrder ?? 0,
            image.isPrimary ?? false,
          ],
        );
      }
    }

    await client.query("COMMIT");

    return product;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

// UPDATE PRODUCT
export const updateProductService = async (productId, data) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const existingProduct = await client.query(
      `
      SELECT id
      FROM products
      WHERE
        LOWER(product_name) = LOWER($1)
        AND brand_id = $2
        AND id <> $3
      `,
      [data.productName, data.brandId, productId],
    );

    if (existingProduct.rowCount > 0) {
      throw new Error("A product with this name already exists for this brand");
    }

    const productResult = await client.query(
      `
      UPDATE products
      SET
        sku = $1,
        barcode = $2,
        slug = $3,
        product_name = $4,
        short_description = $5,
        description = $6,
        features = $7,
        price = $8,
        status = $9,
        category_id = $10,
        brand_id = $11,
        vat_type = $12,
        updated_at = NOW()
      WHERE id = $13
      RETURNING *
      `,
      [
        data.sku,
        data.barcode,
        data.slug,
        data.productName,
        data.shortDescription,
        data.description,
        data.features,
        data.price,
        data.status ?? "active",
        data.categoryId,
        data.brandId,
        data.vatType ?? "vatable",
        productId,
      ],
    );

    if (productResult.rowCount === 0) {
      throw new Error("Product not found");
    }

    const product = productResult.rows[0];

    await client.query(
      `
      DELETE FROM product_specifications
      WHERE product_id = $1
      `,
      [productId],
    );

    await client.query(
      `
      DELETE FROM product_images
      WHERE product_id = $1
      `,
      [productId],
    );

    if (data.specifications.length > 0) {
      for (const specification of data.specifications) {
        await client.query(
          `
          INSERT INTO product_specifications (
            product_id,
            name,
            value
          )
          VALUES ($1,$2,$3)
          `,
          [product.id, specification.name, specification.value],
        );
      }
    }

    if (data.images.length > 0) {
      for (const image of data.images) {
        await client.query(
          `
          INSERT INTO product_images (
            product_id,
            image_url,
            sort_order,
            is_primary
          )
          VALUES ($1,$2,$3,$4)
          `,
          [
            product.id,
            image.imageUrl,
            image.sortOrder ?? 0,
            image.isPrimary ?? false,
          ],
        );
      }
    }

    await client.query("COMMIT");

    return product;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

// DELETE PRODUCT
export const deleteProductService = async (productId) => {
  const result = await pool.query(
    `
    UPDATE products
    SET
      status = 'archived',
      updated_at = NOW()
    WHERE id = $1
    RETURNING id
    `,
    [productId],
  );

  if (result.rowCount === 0) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    throw error;
  }

  return true;
};

// GET PRODUCTS
export const getProductsService = async ({
  page = 1,
  limit = 10,
  search = "",
  status,
  categoryId,
  brandId,
  branchId,
}) => {
  const offset = (page - 1) * limit;

  const values = [];
  const conditions = [];

  let paramCount = 1;

  if (search) {
    conditions.push(`
      (
        p.product_name ILIKE $${paramCount}
        OR p.sku ILIKE $${paramCount}
      )
    `);

    values.push(`%${search}%`);
    paramCount++;
  }

  if (status) {
    conditions.push(`p.status = $${paramCount}`);
    values.push(status);
    paramCount++;
  }

  if (categoryId) {
    conditions.push(`p.category_id = $${paramCount}`);
    values.push(categoryId);
    paramCount++;
  }

  if (brandId) {
    conditions.push(`p.brand_id = $${paramCount}`);
    values.push(brandId);
    paramCount++;
  }

  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  const countQuery = `
    SELECT COUNT(*)::INTEGER AS total
    FROM products p
    ${whereClause}
  `;

  const countResult = await pool.query(countQuery, values);
  const total = countResult.rows[0].total;

  // Save current parameter index for branchId
  let branchParam = null;

  if (branchId) {
    values.push(branchId);
    branchParam = paramCount;
    paramCount++;
  }

  values.push(limit);
  values.push(offset);

  const productsQuery = `
    SELECT
      p.id,
      p.sku,
      p.slug,
      p.barcode,

      p.product_name AS "productName",
      p.price,
      p.status,

      p.created_at AS "createdAt",

      c.name AS "category",
      b.name AS "brand",

      COALESCE(bi.stock, 0) AS stock,
      COALESCE(bi.reserved_stock, 0) AS "reservedStock",

      (
        SELECT image_url
        FROM product_images
        WHERE product_id = p.id
        AND is_primary = true
        LIMIT 1
      ) AS "primaryImage"

    FROM products p

    LEFT JOIN categories c
      ON c.id = p.category_id

    LEFT JOIN brands b
      ON b.id = p.brand_id

    LEFT JOIN branch_inventory bi
      ON bi.product_id = p.id
      ${branchId ? `AND bi.branch_id = $${branchParam}` : ""}

    ${whereClause}

    ORDER BY p.created_at DESC

    LIMIT $${paramCount}
    OFFSET $${paramCount + 1}
  `;

  const productsResult = await pool.query(productsQuery, values);

  return {
    products: productsResult.rows,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};
// GET PRODUCT BY ID
export const getProductByIdService = async (productId) => {
  const productResult = await pool.query(
    `
    SELECT
      p.id,
      p.sku,
      p.barcode,
      p.slug,

      p.product_name AS "productName",
      p.short_description AS "shortDescription",
      p.description,
      p.features,

      p.price,
      p.status,

      p.vat_type AS "vatType",

      p.category_id AS "categoryId",
      c.name AS "categoryName",

      p.brand_id AS "brandId",
      b.name AS "brandName",

      p.created_at AS "createdAt",
      p.updated_at AS "updatedAt"

    FROM products p

    LEFT JOIN categories c
      ON c.id = p.category_id

    LEFT JOIN brands b
      ON b.id = p.brand_id

    WHERE p.id = $1
    `,
    [productId],
  );

  if (productResult.rowCount === 0) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    throw error;
  }

  const product = productResult.rows[0];

  const specificationsResult = await pool.query(
    `
    SELECT
      id,
      name,
      value
    FROM product_specifications
    WHERE product_id = $1
    ORDER BY id ASC
    `,
    [productId],
  );

  const imagesResult = await pool.query(
    `
    SELECT
      id,
      image_url AS "imageUrl",
      sort_order AS "sortOrder",
      is_primary AS "isPrimary"
    FROM product_images
    WHERE product_id = $1
    ORDER BY sort_order ASC
    `,
    [productId],
  );

  return {
    ...product,
    specifications: specificationsResult.rows,
    images: imagesResult.rows,
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

export const findProductByIdService = async (id) => {
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
      p.brand,

      p.created_at AS "createdAt",
      p.updated_at AS "updatedAt"

    FROM products p

    WHERE p.id = $1
  `;

  const { rows } = await pool.query(query, [id]);

  return rows[0];
};
