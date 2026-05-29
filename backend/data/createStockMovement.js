import pool from "../config/db.js";

const createStockMovementTable = async () => {
  const queryText = `
    CREATE TABLE stock_movements (
        id SERIAL PRIMARY KEY,
        branch_id INT NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
        handled_by INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        product_id INT NOT NULL REFERENCES products(id) ON DELETE CASCADE,

        reference VARCHAR(255),
        type VARCHAR(10) NOT NULL CHECK (type IN ('IN', 'OUT')),
        quantity INT NOT NULL CHECK (quantity > 0),

        before_stock INT,
        after_stock INT,

        created_at TIMESTAMPTZ DEFAULT NOW()
    );`;

  try {
    await pool.query(queryText);
    console.log("Stock Movement created if not exists");
  } catch (error) {
    console.log("Error creating stock movement: ", error);
  }
};

export default createStockMovementTable;
