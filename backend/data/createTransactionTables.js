import pool from "../config/db.js";

const createTransactionTables = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS transactions (
      id SERIAL PRIMARY KEY,
      transaction_number VARCHAR(50) UNIQUE NOT NULL,
      
      branch_id INTEGER NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
      handled_by INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      status VARCHAR(50) DEFAULT 'completed',
      
      payment_method VARCHAR(50) NOT NULL DEFAULT 'cash',
      payment_status VARCHAR(50) NOT NULL DEFAULT 'paid',

      customer_name VARCHAR(50),
      customer_tin VARCHAR(50),

      gross_sales NUMERIC(12,2) DEFAULT 0,
      total_sales NUMERIC(12,2) DEFAULT 0,
      discount NUMERIC(10,2) DEFAULT 0,

      vatable_sales NUMERIC(12,2) DEFAULT 0,
      vat_exempt_sales NUMERIC(12,2) DEFAULT 0,
      zero_rated_sales NUMERIC(12,2) DEFAULT 0,

      vat_amount NUMERIC(12,2) DEFAULT 0,

      total_amount NUMERIC(10,2) NOT NULL,

      customer_cash NUMERIC(10,2) DEFAULT NULL,
      change_amount NUMERIC(10,2) DEFAULT NULL,

      void_reason TEXT,
      voided_by VARCHAR(50),
      voided_at TIMESTAMPTZ,

      notes TEXT,

      created_at TIMESTAMPTZ DEFAULT NOW()
    );

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
    console.log("Transaction tables created if not exists");
  } catch (error) {
    console.log("Error creating transaction tables: ", error);
  }
};

export default createTransactionTables;
