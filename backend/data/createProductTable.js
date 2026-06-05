import pool from "../config/db.js";

const createProductTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,

      sku VARCHAR(100) UNIQUE NOT NULL,
      barcode VARCHAR(100) UNIQUE,
      slug VARCHAR(255) UNIQUE NOT NULL,

      product_name VARCHAR(255) NOT NULL,
      short_description TEXT,
      description TEXT,
      features TEXT,

      price NUMERIC(12,2) NOT NULL,

      status VARCHAR(50) DEFAULT 'active',

      category_id INT REFERENCES categories(id) ON DELETE SET NULL,
      brand_id INT REFERENCES brands(id) ON DELETE SET NULL,

      vat_type VARCHAR(50) DEFAULT 'vatable',

      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(queryText);
    console.log("Products Table created if not exists");
  } catch (error) {
    console.log("Error creating products table:", error);
  }
};

export default createProductTable;
