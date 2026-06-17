import pool from "../config/db.js";

const createStockTransferTables = async () => {
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

    CREATE TABLE IF NOT EXISTS stock_transfer_items (
      id SERIAL PRIMARY KEY,

      transfer_id INT NOT NULL
        REFERENCES stock_transfers(id)
        ON DELETE CASCADE,

      product_id INT NOT NULL
        REFERENCES products(id)
        ON DELETE CASCADE,

      quantity INT NOT NULL CHECK(quantity > 0)
    );
  `;

  try {
    await pool.query(queryText);
    console.log("Stock Transfer tables created if not exists");
  } catch (error) {
    console.log("Error creating stock transfer tables:", error);
  }
};

export default createStockTransferTables;
