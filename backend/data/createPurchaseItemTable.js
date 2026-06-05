import pool from "../config/db.js";

const createPurchaseOrderItemTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS purchase_order_items (
      id SERIAL PRIMARY KEY,

      purchase_order_id INT NOT NULL
        REFERENCES purchase_orders(id)
        ON DELETE CASCADE,

      product_id INT NOT NULL
        REFERENCES products(id)
        ON DELETE CASCADE,

      quantity INT NOT NULL CHECK(quantity > 0),

      cost_price DECIMAL(15,2) NOT NULL
    );
  `;

  try {
    await pool.query(queryText);
    console.log("Purchase Order Items Table created if not exists");
  } catch (error) {
    console.log("Error creating purchase order items table:", error);
  }
};

export default createPurchaseOrderItemTable;
