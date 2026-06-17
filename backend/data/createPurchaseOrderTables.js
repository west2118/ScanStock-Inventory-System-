import pool from "../config/db.js";

const createPurchaseOrderTables = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS purchase_orders (
      id SERIAL PRIMARY KEY,

      supplier_id INT NOT NULL
        REFERENCES suppliers(id)
        ON DELETE RESTRICT,

      status VARCHAR(50) DEFAULT 'draft',

      total_amount DECIMAL(15,2) DEFAULT 0,

      created_by INT
        REFERENCES users(id)
        ON DELETE SET NULL,

      created_at TIMESTAMPTZ DEFAULT NOW()
    );

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
    console.log("Purchase Order tables created if not exists");
  } catch (error) {
    console.log("Error creating purchase order tables:", error);
  }
};

export default createPurchaseOrderTables;
