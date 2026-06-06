import pool from "../config/db.js";

const createStockAdjustmentTable = async () => {
  const queryText = `CREATE TABLE IF NOT EXISTS stock_adjustments (
    id SERIAL PRIMARY KEY,

    branch_id INT NOT NULL
        REFERENCES branches(id)
        ON DELETE RESTRICT,

    status VARCHAR(20) NOT NULL DEFAULT 'pending'
        CHECK (status IN (
            'pending',
            'approved',
            'rejected',
            'voided'
        )),

    reason TEXT NOT NULL,

    approved_by INT
        REFERENCES users(id)
        ON DELETE SET NULL,

    approved_at TIMESTAMPTZ,

    rejected_by INT
        REFERENCES users(id)
        ON DELETE SET NULL,

    rejected_at TIMESTAMPTZ,

    rejection_reason TEXT,

    voided_by INT
        REFERENCES users(id)
        ON DELETE SET NULL,

    voided_at TIMESTAMPTZ,

    void_reason TEXT,

    created_by INT NOT NULL
        REFERENCES users(id)
        ON DELETE RESTRICT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);`;

  try {
    await pool.query(queryText);
    console.log("StockAdjustment Table created if not exists");
  } catch (error) {
    console.log("Error creating stockAdjustments table: ", error);
  }
};

export default createStockAdjustmentTable;
