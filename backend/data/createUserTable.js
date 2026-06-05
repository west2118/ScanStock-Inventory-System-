import pool from "../config/db.js";

const createUserTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,

      branch_id INT
        REFERENCES branches(id)
        ON DELETE SET NULL,

      first_name VARCHAR(100) NOT NULL,

      last_name VARCHAR(100) NOT NULL,

      email VARCHAR(255) UNIQUE NOT NULL,

      password TEXT,

      provider VARCHAR(50) NOT NULL DEFAULT 'local',

      provider_id VARCHAR(255),

      status VARCHAR(50) NOT NULL DEFAULT 'active',

      role VARCHAR(50) NOT NULL DEFAULT 'customer',

      email_verified BOOLEAN NOT NULL DEFAULT FALSE,

      last_login_at TIMESTAMPTZ,

      created_at TIMESTAMPTZ DEFAULT NOW(),

      updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(queryText);
    console.log("Users Table created if not exists");
  } catch (error) {
    console.log("Error creating users table:", error);
  }
};

export default createUserTable;
