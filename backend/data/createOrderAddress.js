import pool from "../config/db.js";

const createOrderAddressTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS order_addresses (
      id SERIAL PRIMARY KEY,

      order_id INT UNIQUE NOT NULL
        REFERENCES orders(id) ON DELETE CASCADE,

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
  `;

  try {
    await pool.query(queryText);
    console.log("Order Addresses Table created if not exists");
  } catch (error) {
    console.log("Error creating order addresses table:", error);
  }
};

export default createOrderAddressTable;
