import pool from "../config/db.js";

const createProductImagesTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS product_images (
      id SERIAL PRIMARY KEY,

      product_id INT NOT NULL REFERENCES products(id) ON DELETE CASCADE,

      image_url TEXT NOT NULL,

      sort_order INT DEFAULT 0,
      is_primary BOOLEAN DEFAULT FALSE
    );
  `;

  try {
    await pool.query(queryText);
    console.log("Product Images Table created if not exists");
  } catch (error) {
    console.log("Error creating product images table:", error);
  }
};

export default createProductImagesTable;
