import pool from "../config/db.js";

const createProductTables = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,

      sku VARCHAR(100) UNIQUE NOT NULL,
      barcode VARCHAR(100) UNIQUE,
      slug VARCHAR(255) UNIQUE NOT NULL,

      product_name VARCHAR(255) NOT NULL,
      short_description TEXT,
      description TEXT,
      features TEXT,

      price NUMERIC(12,2) NOT NULL,

      status VARCHAR(50) DEFAULT 'active',

      category_id INT REFERENCES categories(id) ON DELETE SET NULL,
      brand_id INT REFERENCES brands(id) ON DELETE SET NULL,

      vat_type VARCHAR(50) DEFAULT 'vatable',

      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS product_images (
      id SERIAL PRIMARY KEY,

      product_id INT NOT NULL REFERENCES products(id) ON DELETE CASCADE,

      image_url TEXT NOT NULL,

      sort_order INT DEFAULT 0,
      is_primary BOOLEAN DEFAULT FALSE
    );

    CREATE TABLE IF NOT EXISTS product_specifications (
      id SERIAL PRIMARY KEY,

      product_id INT NOT NULL REFERENCES products(id) ON DELETE CASCADE,

      name VARCHAR(255) NOT NULL,
      value TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS product_reviews (
      id SERIAL PRIMARY KEY,
      
      order_id INT NOT NULL
        REFERENCES orders(id)
        ON DELETE CASCADE,

      product_id INT NOT NULL
        REFERENCES products(id)
        ON DELETE CASCADE,

      customer_id INT NOT NULL
        REFERENCES users(id)
        ON DELETE CASCADE,

      rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),

      title VARCHAR(255),

      review TEXT,

      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `;

  try {
    await pool.query(queryText);
    console.log("Product tables created if not exists");
  } catch (error) {
    console.log("Error creating product tables:", error);
  }
};

export default createProductTables;
