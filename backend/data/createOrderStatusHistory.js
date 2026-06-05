import pool from "../config/db.js";

const createOrderStatusHistoryTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS order_status_history (
      id SERIAL PRIMARY KEY,

      order_id INT NOT NULL
        REFERENCES orders(id)
        ON DELETE CASCADE,

      previous_status VARCHAR(50),

      new_status VARCHAR(50) NOT NULL,

      remarks TEXT,

      changed_by INT
        REFERENCES users(id)
        ON DELETE SET NULL,

      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `;

  try {
    await pool.query(queryText);
    console.log("Order Status History Table created if not exists");
  } catch (error) {
    console.log("Error creating order status history table:", error);
  }
};

export default createOrderStatusHistoryTable;
