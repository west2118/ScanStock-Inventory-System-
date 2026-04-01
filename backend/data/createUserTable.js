import pool from "../config/db.js";

const createUserTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'active',
    role VARCHAR(50) DEFAULT 'cashier',

    created_at TIMESTAMPTZ DEFAULT NOW()
);`;

  try {
    pool.query(queryText);
    console.log("User table created if not exists");
  } catch (error) {
    console.log("Error creating user table: ", error);
  }
};

export default createUserTable;
