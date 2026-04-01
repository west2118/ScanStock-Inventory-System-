import pool from "../config/db.js";

const createRefreshTokenTable = async () => {
  const queryText = `CREATE TABLE IF NOT EXISTS refresh_tokens (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    token_hash TEXT NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    revoked BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMPTZ DEFAULT NOW()
);`;

  try {
    pool.query(queryText);
    console.log("RefreshToken Table created if not exists");
  } catch (error) {
    console.log("Error creating refreshTokens table: ", error);
  }
};

export default createRefreshTokenTable;
