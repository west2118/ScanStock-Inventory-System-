import pool from "../config/db.js";

const createBrandTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS brands (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL,
      slug VARCHAR(255) UNIQUE,
      logo_url TEXT,
      status VARCHAR(50) DEFAULT 'active',

      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(queryText);
    console.log("Brands Table created if not exists");
  } catch (error) {
    console.log("Error creating brands table:", error);
  }
};

export default createBrandTable;
