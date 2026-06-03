import pool from "../config/db.js";

const createProductSpecificationsTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS product_specifications (
      id SERIAL PRIMARY KEY,

      product_id INT NOT NULL REFERENCES products(id) ON DELETE CASCADE,

      name VARCHAR(255) NOT NULL,
      value TEXT NOT NULL
    );
  `;

  try {
    await pool.query(queryText);
    console.log("Product Specifications Table created if not exists");
  } catch (error) {
    console.log("Error creating product specifications table:", error);
  }
};

export default createProductSpecificationsTable;
