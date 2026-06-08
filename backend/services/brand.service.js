import pool from "../config/db.js";

export const createBrandService = async (data) => {
  const { name, logoUrl, status = "active" } = data;

  const existingBrand = await pool.query(
    `
    SELECT id
    FROM brands
    WHERE LOWER(name) = LOWER($1)
      AND status <> 'archived'
    `,
    [name],
  );

  if (existingBrand.rowCount > 0) {
    const error = new Error("Brand already exists");
    error.statusCode = 409;
    throw error;
  }

  const result = await pool.query(
    `
    INSERT INTO brands (
      name,
      logo_url,
      status
    )
    VALUES ($1, $2, $3)
    RETURNING *
    `,
    [name, logoUrl ?? null, status],
  );

  return result.rows[0];
};

export const getBrandsService = async () => {
  const result = await pool.query(`
    SELECT
      b.id,
      b.name,
      COUNT(p.id)::INTEGER AS count
    FROM brands b
    LEFT JOIN products p
      ON p.brand_id = b.id
      AND p.status = 'active'
    WHERE b.status <> 'archived'
    GROUP BY b.id, b.name
    ORDER BY b.name ASC
  `);

  return result.rows;
};

export const getBrandByIdService = async (id) => {
  const result = await pool.query(
    `
    SELECT *
    FROM brands
    WHERE id = $1
      AND status <> 'archived'
    `,
    [id],
  );

  return result.rows[0] || null;
};

export const updateBrandService = async (id, data) => {
  const existingBrand = await getBrandByIdService(id);

  if (!existingBrand) {
    return null;
  }

  const updatedName = data.name ?? existingBrand.name;

  const duplicateBrand = await pool.query(
    `
    SELECT id
    FROM brands
    WHERE LOWER(name) = LOWER($1)
      AND id <> $2
      AND status <> 'archived'
    `,
    [updatedName, id],
  );

  if (duplicateBrand.rowCount > 0) {
    const error = new Error("Brand already exists");
    error.statusCode = 409;
    throw error;
  }

  const result = await pool.query(
    `
    UPDATE brands
    SET
      name = $1,
      logo_url = $2,
      status = $3,
      updated_at = NOW()
    WHERE id = $4
    RETURNING *
    `,
    [
      updatedName,
      data.logoUrl ?? existingBrand.logo_url,
      data.status ?? existingBrand.status,
      id,
    ],
  );

  return result.rows[0];
};

export const deleteBrandService = async (id) => {
  const result = await pool.query(
    `
    UPDATE brands
    SET
      status = 'archived',
      updated_at = NOW()
    WHERE id = $1
      AND status <> 'archived'
    RETURNING id
    `,
    [id],
  );

  return result.rows[0] || null;
};
