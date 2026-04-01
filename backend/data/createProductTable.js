import pool from "../config/db.js";

const createProductTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        sku VARCHAR(100) UNIQUE NOT NULL,
        barcode VARCHAR(100) UNIQUE NOT NULL,
        product_name VARCHAR(255) NOT NULL,
        price INT NOT NULL, 
        status VARCHAR(255) SET DEFAULT 'active',
        category VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        vat_type VARCHAR(255) NOT NULL DEFAULT 'vatable',

        stock INT DEFAULT 0,
        stock_low INT DEFAULT 10,
        stock_critical INT DEFAULT 5,
        stock_high INT DEFAULT 20,

        updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMPTZ DEFAULT NOW()
    );`;

  try {
    pool.query(queryText);
    console.log("Product Table created if not exists");
  } catch (error) {
    console.log("Error creating product table: ", error);
  }
};

export default createProductTable;
