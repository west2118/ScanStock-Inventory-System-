import pool from "../config/db.js";

const createWishlistTables = async () => {
  const wishlistsQuery = `
    CREATE TABLE IF NOT EXISTS wishlists (
      id SERIAL PRIMARY KEY,
      user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(user_id)
    );
  `;

  const wishlistItemsQuery = `
    CREATE TABLE IF NOT EXISTS wishlist_items (
      id SERIAL PRIMARY KEY,
      wishlist_id INT NOT NULL REFERENCES wishlists(id) ON DELETE CASCADE,
      product_id INT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(wishlist_id, product_id)
    );
  `;

  try {
    await pool.query(wishlistsQuery);
    console.log("Wishlists Table created if not exists");
    
    await pool.query(wishlistItemsQuery);
    console.log("Wishlist Items Table created if not exists");
  } catch (error) {
    console.log("Error creating wishlist tables:", error);
  }
};

export default createWishlistTables;
