import pool from "../config/db.js";

const createBranchTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS branches (
      id SERIAL PRIMARY KEY,
      branch_name VARCHAR(100) UNIQUE NOT NULL,
      branch_code VARCHAR(100) UNIQUE NOT NULL,
      location VARCHAR(255) NOT NULL,
      status VARCHAR(255) DEFAULT 'active',

      created_at TIMESTAMPTZ DEFAULT NOW()
    );`;

  try {
    await pool.query(queryText);
    console.log("Branch Table created if not exists");
  } catch (error) {
    console.log("Error creating branch table: ", error);
  }
};

export default createBranchTable;
