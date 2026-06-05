import pool from "../config/db.js";

const createOrderTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,

      branch_id INT
        REFERENCES branches(id)
        ON DELETE SET NULL,

      customer_id INT NOT NULL
        REFERENCES users(id)
        ON DELETE CASCADE,

      order_number VARCHAR(50) UNIQUE NOT NULL,

      subtotal NUMERIC(12,2) NOT NULL DEFAULT 0,
      shipping_fee NUMERIC(12,2) NOT NULL DEFAULT 0,
      discount_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
      tax_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
      total_amount NUMERIC(12,2) NOT NULL DEFAULT 0,

      payment_method VARCHAR(50) NOT NULL,

      payment_status VARCHAR(50) NOT NULL DEFAULT 'pending',

      payment_intent_id VARCHAR(255),

      refunded_amount NUMERIC(12,2) NOT NULL DEFAULT 0,

      paid_at TIMESTAMPTZ,

      order_status VARCHAR(50) NOT NULL DEFAULT 'pending',

      notes TEXT,

      fulfilled_by INT
        REFERENCES users(id)
        ON DELETE SET NULL,

      placed_at TIMESTAMPTZ DEFAULT NOW(),

      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(queryText);
    console.log("Orders Table created if not exists");
  } catch (error) {
    console.log("Error creating orders table:", error);
  }
};

export default createOrderTable;
