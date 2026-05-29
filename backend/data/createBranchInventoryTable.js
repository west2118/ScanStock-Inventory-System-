import pool from "../config/db.js";

const createBranchInventoryTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS branch_inventory (
      id SERIAL PRIMARY KEY,

      branch_id INT NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
      product_id INT NOT NULL REFERENCES products(id) ON DELETE CASCADE,

      location VARCHAR(100) DEFAULT NULL,

      stock INT DEFAULT 0,
      stock_low INT DEFAULT 10,
      stock_critical INT DEFAULT 5,
      stock_high INT DEFAULT 20,

      updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    );`;

  try {
    await pool.query(queryText);
    console.log("BranchInventory Table created if not exists");
  } catch (error) {
    console.log("Error creating branchInventory table: ", error);
  }
};

export default createBranchInventoryTable;
