import pool from "../config/db.js";

const createTransactionItemTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS transaction_items (
      id SERIAL PRIMARY KEY,

      transaction_id INTEGER NOT NULL REFERENCES transactions(id) ON DELETE CASCADE,
      product_id INTEGER NOT NULL REFERENCES products(id),
      
      quantity INTEGER NOT NULL CHECK (quantity > 0),

      price NUMERIC(10,2) NOT NULL CHECK (price >= 0),
      subtotal NUMERIC(10,2) NOT NULL CHECK (subtotal >= 0),

      vat_type VARCHAR(20) NOT NULL,

      product_name VARCHAR(100) NOT NULL,

      created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(queryText);
    console.log("Transaction items table created if not exists");
  } catch (error) {
    console.log("Error creating transaction items table: ", error);
  }
};

export default createTransactionItemTable;
