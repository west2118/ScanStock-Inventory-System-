import pool from "../config/db.js";

const createStockAdjustmentItemTable = async () => {
  const queryText = `CREATE TABLE IF NOT EXISTS stock_adjustment_items (
    id SERIAL PRIMARY KEY,

    adjustment_id INT NOT NULL
        REFERENCES stock_adjustments(id)
        ON DELETE CASCADE,

    product_id INT NOT NULL
        REFERENCES products(id)
        ON DELETE RESTRICT,

    adjustment_type VARCHAR(20) NOT NULL
        CHECK (adjustment_type IN (
            'IN',
            'OUT'
        )),

    quantity NUMERIC(12,2) NOT NULL
        CHECK (quantity > 0),

    remarks TEXT
);`;

  try {
    await pool.query(queryText);
    console.log("StockAdjustmentItem Table created if not exists");
  } catch (error) {
    console.log("Error creating stockAdjustmentItems table: ", error);
  }
};

export default createStockAdjustmentItemTable;
