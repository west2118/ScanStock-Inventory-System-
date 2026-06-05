import pool from "../config/db.js";

const createSalesTargetTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS sales_targets (
      id SERIAL PRIMARY KEY,

      branch_id INT NOT NULL
        REFERENCES branches(id)
        ON DELETE CASCADE,

      target_month DATE NOT NULL,
      sales_target DECIMAL(15,2) DEFAULT 0,
      transaction_target INT DEFAULT 0,

      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW(),

      UNIQUE(branch_id, target_month)
    );
  `;

  try {
    await pool.query(queryText);
    console.log("Sales Target Table created if not exists");
  } catch (error) {
    console.log("Error creating sales target table:", error);
  }
};

export default createSalesTargetTable;
