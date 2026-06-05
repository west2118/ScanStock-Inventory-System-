import pool from "../config/db.js";

const createBranchInventoryTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS branch_inventory (
      id SERIAL PRIMARY KEY,

      branch_id INT NOT NULL
        REFERENCES branches(id)
        ON DELETE CASCADE,

      product_id INT NOT NULL
        REFERENCES products(id)
        ON DELETE CASCADE,

      shelf_location VARCHAR(100),

      stock INT DEFAULT 0,
      reserved_stock INT DEFAULT 0,

      stock_low INT DEFAULT 10,
      stock_critical INT DEFAULT 5,
      stock_high INT DEFAULT 100,

      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW(),

      UNIQUE(branch_id, product_id)
    );
  `;

  try {
    await pool.query(queryText);
    console.log("Branch Inventory Table created if not exists");
  } catch (error) {
    console.log("Error creating branch inventory table:", error);
  }
};

export default createBranchInventoryTable;
