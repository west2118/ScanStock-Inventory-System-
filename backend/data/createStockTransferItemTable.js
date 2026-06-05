import pool from "../config/db.js";

const createStockTransferItemTable = async () => {
  const queryText = `
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
    console.log("Stock Transfer Items Table created if not exists");
  } catch (error) {
    console.log("Error creating stock transfer items table:", error);
  }
};

export default createStockTransferItemTable;
