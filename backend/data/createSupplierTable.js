import pool from "../config/db.js";

const createSupplierTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS suppliers (
      id SERIAL PRIMARY KEY,

      supplier_name VARCHAR(255) NOT NULL,
      contact_person VARCHAR(255),

      phone VARCHAR(50),
      email VARCHAR(255),

      address TEXT,

      status VARCHAR(50) DEFAULT 'active',

      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `;

  try {
    await pool.query(queryText);
    console.log("Suppliers Table created if not exists");
  } catch (error) {
    console.log("Error creating suppliers table:", error);
  }
};

export default createSupplierTable;
