import pool from "../config/db.js";

export const createCheckoutService = async (customerId) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const selectedItems = await client.query(
      `
      SELECT
        ci.product_id,
        ci.quantity,
        p.price
      FROM cart_items ci
      JOIN carts c ON c.id = ci.cart_id
      JOIN products p ON p.id = ci.product_id
      WHERE c.customer_id = $1
        AND ci.is_selected = TRUE
      `,
      [customerId],
    );

    if (selectedItems.rows.length === 0) {
      throw new Error("Please select at least one item");
    }

    const sessionResult = await client.query(
      `
      INSERT INTO checkout_sessions (
        customer_id,
        expires_at
      )
      VALUES (
        $1,
        NOW() + INTERVAL '30 minutes'
      )
      RETURNING id
      `,
      [customerId],
    );

    const checkoutSessionId = sessionResult.rows[0].id;

    for (const item of selectedItems.rows) {
      await client.query(
        `
        INSERT INTO checkout_session_items (
          checkout_session_id,
          product_id,
          quantity,
          price
        )
        VALUES ($1, $2, $3, $4)
        `,
        [checkoutSessionId, item.product_id, item.quantity, item.price],
      );
    }

    await client.query("COMMIT");

    return {
      checkoutSessionId,
    };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};
