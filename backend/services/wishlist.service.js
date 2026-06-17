import pool from "../config/db.js";

export const getWishlistService = async (customerId) => {
  let wishlistResult = await pool.query(
    "SELECT id FROM wishlists WHERE user_id = $1",
    [customerId]
  );

  if (wishlistResult.rows.length === 0) {
    wishlistResult = await pool.query(
      "INSERT INTO wishlists (user_id) VALUES ($1) RETURNING id",
      [customerId]
    );
  }

  const wishlistId = wishlistResult.rows[0].id;

  const itemsResult = await pool.query(
    `SELECT 
      p.id, 
      p.product_name as name, 
      p.price, 
      COALESCE((SELECT SUM(stock) FROM branch_inventory WHERE product_id = p.id), 0) as stock, 
      b.name as brand,
      COALESCE(
          (SELECT image_url FROM product_images pi WHERE pi.product_id = p.id ORDER BY is_primary DESC, id ASC LIMIT 1),
          'https://images.unsplash.com/photo-1591488322449-7f9c3fd4c5f5?w=300&h=200&fit=crop'
      ) as image
    FROM wishlist_items wi
    JOIN products p ON wi.product_id = p.id
    LEFT JOIN brands b ON b.id = p.brand_id
    WHERE wi.wishlist_id = $1
    ORDER BY wi.created_at DESC`,
    [wishlistId]
  );

  return itemsResult.rows.map(item => ({
    ...item,
    inStock: parseInt(item.stock) > 0,
    rating: 5.0,
    reviews: 0
  }));
};

export const addToWishlistService = async ({ customerId, productId }) => {
  let wishlistResult = await pool.query(
    "SELECT id FROM wishlists WHERE user_id = $1",
    [customerId]
  );

  if (wishlistResult.rows.length === 0) {
    wishlistResult = await pool.query(
      "INSERT INTO wishlists (user_id) VALUES ($1) RETURNING id",
      [customerId]
    );
  }

  const wishlistId = wishlistResult.rows[0].id;

  await pool.query(
    `INSERT INTO wishlist_items (wishlist_id, product_id) 
     VALUES ($1, $2) 
     ON CONFLICT (wishlist_id, product_id) DO NOTHING`,
    [wishlistId, productId]
  );

  return { success: true };
};

export const removeFromWishlistService = async ({ customerId, productId }) => {
  const wishlistResult = await pool.query(
    "SELECT id FROM wishlists WHERE user_id = $1",
    [customerId]
  );

  if (wishlistResult.rows.length > 0) {
    const wishlistId = wishlistResult.rows[0].id;
    await pool.query(
      "DELETE FROM wishlist_items WHERE wishlist_id = $1 AND product_id = $2",
      [wishlistId, productId]
    );
  }
  return { success: true };
};

export const removeBulkWishlistService = async ({ customerId, productIds }) => {
  const wishlistResult = await pool.query(
    "SELECT id FROM wishlists WHERE user_id = $1",
    [customerId]
  );

  if (wishlistResult.rows.length > 0 && productIds && productIds.length > 0) {
    const wishlistId = wishlistResult.rows[0].id;
    await pool.query(
      "DELETE FROM wishlist_items WHERE wishlist_id = $1 AND product_id = ANY($2::int[])",
      [wishlistId, productIds]
    );
  }
  return { success: true };
};

export const getWishlistCountService = async (customerId) => {
  const wishlistResult = await pool.query(
    "SELECT id FROM wishlists WHERE user_id = $1",
    [customerId]
  );
  if (wishlistResult.rows.length === 0) return { count: 0 };
  
  const countResult = await pool.query(
    "SELECT COUNT(*) FROM wishlist_items WHERE wishlist_id = $1",
    [wishlistResult.rows[0].id]
  );
  return { count: parseInt(countResult.rows[0].count) };
};
