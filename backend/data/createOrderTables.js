import pool from "../config/db.js";

const createOrderTables = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,

      branch_id INT
        REFERENCES branches(id)
        ON DELETE SET NULL,

      customer_id INT NOT NULL
        REFERENCES users(id)
        ON DELETE CASCADE,

      order_number VARCHAR(100) UNIQUE NOT NULL,

      subtotal NUMERIC(12,2) NOT NULL DEFAULT 0,
      shipping_fee NUMERIC(12,2) NOT NULL DEFAULT 0,
      discount_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
      tax_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
      total_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
      net_sales NUMERIC(12,2) NOT NULL DEFAULT 0,

      delivery_method VARCHAR(50) NOT NULL,

      order_status VARCHAR(50) NOT NULL DEFAULT 'pending',

      notes TEXT,

      fulfilled_by INT
        REFERENCES users(id)
        ON DELETE SET NULL,

      placed_at TIMESTAMPTZ DEFAULT NOW(),
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS order_items (
      id SERIAL PRIMARY KEY,

      order_id INT NOT NULL
        REFERENCES orders(id)
        ON DELETE CASCADE,

      product_id INT NOT NULL
        REFERENCES products(id)
        ON DELETE RESTRICT,

      sku VARCHAR(100) NOT NULL,

      product_name VARCHAR(255) NOT NULL,

      price NUMERIC(12,2) NOT NULL CHECK(price >= 0),

      quantity INT NOT NULL CHECK(quantity > 0),

      subtotal NUMERIC(12,2) NOT NULL CHECK(subtotal >= 0)
    );

    CREATE TABLE IF NOT EXISTS order_addresses (
      id SERIAL PRIMARY KEY,

      order_id INT UNIQUE NOT NULL
        REFERENCES orders(id)
        ON DELETE CASCADE,

      full_name VARCHAR(255) NOT NULL,

      email VARCHAR(255) NOT NULL,

      phone VARCHAR(50) NOT NULL,

      address_line TEXT NOT NULL,

      barangay VARCHAR(255) NOT NULL,

      city VARCHAR(255) NOT NULL,

      province VARCHAR(255) NOT NULL,

      postal_code VARCHAR(20),

      landmark TEXT
    );

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
    console.log("Order tables created if not exists");
  } catch (error) {
    console.log("Error creating order tables:", error);
  }
};

export default createOrderTables;
