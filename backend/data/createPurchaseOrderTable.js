import pool from "../config/db.js";

const createPurchaseOrderTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS purchase_orders (
      id SERIAL PRIMARY KEY,

      supplier_id INT NOT NULL
        REFERENCES suppliers(id)
        ON DELETE RESTRICT,

      status VARCHAR(50) DEFAULT 'draft',

      total_amount DECIMAL(15,2) DEFAULT 0,

      created_by INT
        REFERENCES users(id)
        ON DELETE SET NULL,

      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `;

  try {
    await pool.query(queryText);
    console.log("Purchase Orders Table created if not exists");
  } catch (error) {
    console.log("Error creating purchase orders table:", error);
  }
};

export default createPurchaseOrderTable;
