import pool from "../config/db.js";

const createStockMovementTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS stock_movements (
      id SERIAL PRIMARY KEY,

      branch_id INT NOT NULL
        REFERENCES branches(id)
        ON DELETE CASCADE,

      product_id INT NOT NULL
        REFERENCES products(id)
        ON DELETE CASCADE,

      handled_by INT
        REFERENCES users(id)
        ON DELETE SET NULL,

      reference_type VARCHAR(50),
      reference_id INT,

      movement_type VARCHAR(50) NOT NULL,

      quantity INT NOT NULL,
      price DECIMAL(15,2) DEFAULT 0,

      before_stock INT NOT NULL,
      after_stock INT NOT NULL,

      remarks TEXT,

      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `;

  try {
    await pool.query(queryText);
    console.log("Stock Movements Table created if not exists");
  } catch (error) {
    console.log("Error creating stock movements table:", error);
  }
};

export default createStockMovementTable;
