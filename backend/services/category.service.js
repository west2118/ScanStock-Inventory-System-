import pool from "../config/db.js";

export const createCategoryService = async (data) => {
  const { name, parentId = null, status = "active" } = data;

  console.log(data);

  const existingCategory = await pool.query(
    `
    SELECT id
    FROM categories
    WHERE LOWER(name) = LOWER($1)
      AND status <> 'archived'
    `,
    [name],
  );

  if (existingCategory.rowCount > 0) {
    const error = new Error("Category already exists");
    error.statusCode = 409;
    throw error;
  }

  if (parentId) {
    const parentCategory = await pool.query(
      `
      SELECT id
      FROM categories
      WHERE id = $1
        AND status <> 'archived'
      `,
      [parentId],
    );

    if (parentCategory.rowCount === 0) {
      const error = new Error("Parent category not found");
      error.statusCode = 404;
      throw error;
    }
  }

  const result = await pool.query(
    `
    INSERT INTO categories (
      name,
      parent_id,
      status
    )
    VALUES ($1, $2, $3)
    RETURNING *
    `,
    [name, parentId, status],
  );

  return result.rows[0];
};

export const getCategoriesService = async () => {
  const result = await pool.query(`
    SELECT
      c.id,
      c.name,
      COUNT(p.id)::INTEGER AS count
    FROM categories c
    LEFT JOIN products p
      ON p.category_id = c.id
      AND p.status = 'active'
    GROUP BY c.id, c.name
    ORDER BY c.name ASC
  `);

  return result.rows;
};

export const getCategoryByIdService = async (id) => {
  const result = await pool.query(
    `
    SELECT
      c.*,
      p.name AS "parentName"
    FROM categories c
    LEFT JOIN categories p
      ON c.parent_id = p.id
    WHERE c.id = $1
      AND c.status <> 'archived'
    `,
    [id],
  );

  return result.rows[0] || null;
};

export const updateCategoryService = async (id, data) => {
  const existingCategory = await getCategoryByIdService(id);

  if (!existingCategory) {
    return null;
  }

  const updatedName = data.name ?? existingCategory.name;

  const updatedParentId = data.parentId ?? existingCategory.parent_id;

  const duplicateCategory = await pool.query(
    `
    SELECT id
    FROM categories
    WHERE LOWER(name) = LOWER($1)
      AND id <> $2
      AND status <> 'archived'
    `,
    [updatedName, id],
  );

  if (duplicateCategory.rowCount > 0) {
    const error = new Error("Category already exists");
    error.statusCode = 409;
    throw error;
  }

  if (updatedParentId && Number(updatedParentId) === Number(id)) {
    const error = new Error("Category cannot be its own parent");

    error.statusCode = 400;
    throw error;
  }

  const result = await pool.query(
    `
    UPDATE categories
    SET
      name = $1,
      parent_id = $2,
      status = $3,
      updated_at = NOW()
    WHERE id = $4
    RETURNING *
    `,
    [updatedName, updatedParentId, data.status ?? existingCategory.status, id],
  );

  return result.rows[0];
};

export const deleteCategoryService = async (id) => {
  const childCategories = await pool.query(
    `
    SELECT id
    FROM categories
    WHERE parent_id = $1
      AND status <> 'archived'
    `,
    [id],
  );

  if (childCategories.rowCount > 0) {
    const error = new Error("Cannot archive category with child categories");

    error.statusCode = 400;
    throw error;
  }

  const result = await pool.query(
    `
    UPDATE categories
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
