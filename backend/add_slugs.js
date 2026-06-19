import pool from "./config/db.js";

const addSlugs = async () => {
  try {
    await pool.query(`ALTER TABLE brands ADD COLUMN IF NOT EXISTS slug VARCHAR(255) UNIQUE;`);
    console.log("Added slug to brands");

    await pool.query(`ALTER TABLE categories ADD COLUMN IF NOT EXISTS slug VARCHAR(255) UNIQUE;`);
    console.log("Added slug to categories");

    await pool.query(`UPDATE brands SET slug = LOWER(REPLACE(name, ' ', '-')) || '-' || id WHERE slug IS NULL;`);
    await pool.query(`UPDATE categories SET slug = LOWER(REPLACE(name, ' ', '-')) || '-' || id WHERE slug IS NULL;`);
    
    console.log("Populated empty slugs");
  } catch (error) {
    console.error("Error adding slugs:", error);
  } finally {
    process.exit();
  }
};

addSlugs();
