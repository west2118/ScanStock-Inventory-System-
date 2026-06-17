import pool from "../config/db.js";

export const getCartService = async (customerId) => {
  const cartResult = await pool.query(
    `
    SELECT id
    FROM carts
    WHERE customer_id = $1
    `,
    [customerId],
  );

  if (cartResult.rows.length === 0) {
    return [];
  }

  const cartId = cartResult.rows[0].id;

  const itemsResult = await pool.query(
    `
    SELECT
        ci.id,
        ci.product_id AS "productId",

        p.product_name AS "productName",
        p.sku,
        p.price,
        COALESCE(bi.stock, 0) AS stock,
        ci.is_selected AS "isSelected",

        b.name AS "brandName",

        pi.image_url AS "imageUrl",

        ci.quantity,

        ci.created_at AS "createdAt",
        ci.updated_at AS "updatedAt"

    FROM cart_items ci

    JOIN products p
        ON p.id = ci.product_id

    LEFT JOIN branches br 
        ON br.branch_name = 'Central Warehouse'

    LEFT JOIN branch_inventory bi 
        ON bi.product_id = p.id AND bi.branch_id = br.id

    LEFT JOIN brands b
        ON b.id = p.brand_id

    LEFT JOIN product_images pi
        ON pi.product_id = p.id
        AND pi.is_primary = TRUE

    WHERE ci.cart_id = $1

    ORDER BY ci.id DESC;
    `,
    [cartId],
  );

  return itemsResult.rows;
};

export const addCartService = async ({ customerId, productId, quantity = 1 }) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    let cartResult = await client.query(
      `
      SELECT id
      FROM carts
      WHERE customer_id = $1
      `,
      [customerId],
    );

    let cartId;

    if (cartResult.rows.length === 0) {
      const newCart = await client.query(
        `
        INSERT INTO carts (customer_id)
        VALUES ($1)
        RETURNING id
        `,
        [customerId],
      );

      cartId = newCart.rows[0].id;
    } else {
      cartId = cartResult.rows[0].id;
    }

    const itemResult = await client.query(
      `
      INSERT INTO cart_items (cart_id, product_id, quantity)
      VALUES ($1, $2, $3)
      ON CONFLICT (cart_id, product_id)
      DO UPDATE SET
        quantity = cart_items.quantity + $3,
        updated_at = CURRENT_TIMESTAMP
      RETURNING *
      `,
      [cartId, productId, quantity],
    );

    await client.query(
      `
      UPDATE carts
      SET updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      `,
      [cartId],
    );

    // Automatically remove from wishlist if present
    const wishlistResult = await client.query(
      `
      SELECT id FROM wishlists WHERE user_id = $1
      `,
      [customerId]
    );

    if (wishlistResult.rows.length > 0) {
      await client.query(
        `
        DELETE FROM wishlist_items 
        WHERE wishlist_id = $1 AND product_id = $2
        `,
        [wishlistResult.rows[0].id, productId]
      );
    }

    await client.query("COMMIT");

    return itemResult.rows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

export const minusCartService = async ({ customerId, productId }) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const cartResult = await client.query(
      `
      SELECT id
      FROM carts
      WHERE customer_id = $1
      `,
      [customerId],
    );

    if (cartResult.rows.length === 0) {
      throw new Error("Cart not found");
    }

    const cartId = cartResult.rows[0].id;

    const itemResult = await client.query(
      `
      SELECT id, quantity
      FROM cart_items
      WHERE cart_id = $1 AND product_id = $2
      `,
      [cartId, productId],
    );

    if (itemResult.rows.length === 0) {
      throw new Error("Product not found in cart");
    }

    const item = itemResult.rows[0];

    if (item.quantity <= 1) {
      await client.query(
        `
        DELETE FROM cart_items
        WHERE id = $1
        `,
        [item.id],
      );

      await client.query("COMMIT");

      return {
        message: "Product removed from cart",
      };
    }

    const updatedItem = await client.query(
      `
      UPDATE cart_items
      SET
        quantity = quantity - 1,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING *
      `,
      [item.id],
    );

    await client.query(
      `
      UPDATE carts
      SET updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      `,
      [cartId],
    );

    await client.query("COMMIT");

    return updatedItem.rows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

export const removeCartItemService = async ({ customerId, productId }) => {
  const result = await pool.query(
    `
    DELETE FROM cart_items ci
    USING carts c
    WHERE ci.cart_id = c.id
      AND c.customer_id = $1
      AND ci.product_id = $2
    RETURNING ci.*
    `,
    [customerId, productId],
  );

  if (result.rows.length === 0) {
    throw new Error("Product not found in cart");
  }

  return result.rows[0];
};

export const toggleSelectCartItemService = async ({
  customerId,
  productId,
}) => {
  const result = await pool.query(
    `
    UPDATE cart_items ci
    SET
      is_selected = NOT ci.is_selected,
      updated_at = CURRENT_TIMESTAMP
    FROM carts c
    WHERE ci.cart_id = c.id
      AND c.customer_id = $1
      AND ci.product_id = $2
    RETURNING
      ci.id,
      ci.product_id AS "productId",
      ci.quantity,
      ci.is_selected AS "isSelected",
      ci.updated_at AS "updatedAt"
    `,
    [customerId, productId],
  );

  if (result.rows.length === 0) {
    throw new Error("Product not found in cart");
  }

  return result.rows[0];
};

export const getCartCountService = async (customerId) => {
  const cartResult = await pool.query(
    "SELECT id FROM carts WHERE customer_id = $1",
    [customerId]
  );
  if (cartResult.rows.length === 0) return { count: 0 };
  
  const countResult = await pool.query(
    "SELECT COUNT(*) FROM cart_items WHERE cart_id = $1",
    [cartResult.rows[0].id]
  );
  return { count: parseInt(countResult.rows[0].count) };
};
