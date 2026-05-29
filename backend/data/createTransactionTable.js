import pool from "../config/db.js";

const createTransactionTable = async () => {
  const queryText = `CREATE TABLE IF NOT EXISTS transactions (
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
);`;

  try {
    await pool.query(queryText);
    console.log("Transaction table created if not exists");
  } catch (error) {
    console.log("Error creating transaction table: ", error);
  }
};

export default createTransactionTable;
