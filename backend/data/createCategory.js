import pool from "../config/db.js";

const createCategoryTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS categories (
      id SERIAL PRIMARY KEY,
      parent_id INT REFERENCES categories(id) ON DELETE SET NULL,

      image_url TEXT NOT NULL,

      name VARCHAR(255) NOT NULL,
      slug VARCHAR(255) UNIQUE,
      status VARCHAR(50) DEFAULT 'active',

      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(queryText);
    console.log("Categories Table created if not exists");
  } catch (error) {
    console.log("Error creating categories table:", error);
  }
};

export default createCategoryTable;
