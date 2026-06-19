import pool from "./config/db.js";

const fixDb = async () => {
  try {
    await pool.query('ALTER TABLE branches ADD COLUMN IF NOT EXISTS manager_id INT REFERENCES users(id) ON DELETE SET NULL;');
    console.log('Successfully added manager_id column.');
  } catch (err) {
    console.log('Error adding manager_id:', err.message);
  }
  process.exit(0);
};

fixDb();
