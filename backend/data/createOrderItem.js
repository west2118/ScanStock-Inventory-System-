import pool from "../config/db.js";

const createOrderItemTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS order_items (
      id SERIAL PRIMARY KEY,

      order_id INT NOT NULL
        REFERENCES orders(id) ON DELETE CASCADE,

      product_id INT NOT NULL
        REFERENCES products(id) ON DELETE RESTRICT,

      sku VARCHAR(100) NOT NULL,

      product_name VARCHAR(255) NOT NULL,

      price NUMERIC(12,2) NOT NULL CHECK(price >= 0),

      quantity INT NOT NULL CHECK(quantity > 0),

      subtotal NUMERIC(12,2) NOT NULL CHECK(subtotal >= 0)
    );
  `;

  try {
    await pool.query(queryText);
    console.log("Order Items Table created if not exists");
  } catch (error) {
    console.log("Error creating order items table:", error);
  }
};

export default createOrderItemTable;
