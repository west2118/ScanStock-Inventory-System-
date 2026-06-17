import pool from "../config/db.js";

const createStockAdjustmentTables = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS stock_adjustments (
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

      adjustment_type VARCHAR(20) NOT NULL
          CHECK (adjustment_type IN (
              'IN',
              'OUT'
          )),

      reason TEXT NOT NULL,

      handled_by INT REFERENCES users(id) ON DELETE SET NULL,

      handled_at TIMESTAMPTZ,

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
    );

    CREATE TABLE IF NOT EXISTS stock_adjustment_items (
      id SERIAL PRIMARY KEY,

      adjustment_id INT NOT NULL
        REFERENCES stock_adjustments(id)
        ON DELETE CASCADE,

      product_id INT NOT NULL
        REFERENCES products(id)
        ON DELETE RESTRICT,

      quantity INT NOT NULL
        CHECK (quantity > 0),

      previous_stock INT,
      new_stock INT,

      remarks TEXT
    );
  `;

  try {
    await pool.query(queryText);
    console.log("StockAdjustment tables created if not exists");
  } catch (error) {
    console.log("Error creating stockAdjustment tables: ", error);
  }
};

export default createStockAdjustmentTables;
