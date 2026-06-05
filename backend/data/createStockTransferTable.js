import pool from "../config/db.js";

const createStockTransferTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS stock_transfers (
      id SERIAL PRIMARY KEY,

      from_branch_id INT NOT NULL
        REFERENCES branches(id),

      to_branch_id INT NOT NULL
        REFERENCES branches(id),

      status VARCHAR(50) DEFAULT 'pending',

      created_by INT
        REFERENCES users(id)
        ON DELETE SET NULL,

      approved_by INT
        REFERENCES users(id)
        ON DELETE SET NULL,

      received_by INT
        REFERENCES users(id)
        ON DELETE SET NULL,

      approved_at TIMESTAMPTZ,
      received_at TIMESTAMPTZ,

      remarks TEXT,

      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `;

  try {
    await pool.query(queryText);
    console.log("Stock Transfers Table created if not exists");
  } catch (error) {
    console.log("Error creating stock transfers table:", error);
  }
};

export default createStockTransferTable;
