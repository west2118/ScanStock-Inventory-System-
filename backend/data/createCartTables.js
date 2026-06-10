import pool from "../config/db.js";

const createCartTables = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS carts (
      id SERIAL PRIMARY KEY,

      customer_id INT NOT NULL
        REFERENCES users(id)
        ON DELETE CASCADE,

      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS cart_items (
        id SERIAL PRIMARY KEY,

        cart_id INT NOT NULL
            REFERENCES carts(id)
            ON DELETE CASCADE,

        product_id INT NOT NULL
            REFERENCES products(id)
            ON DELETE CASCADE,

        quantity INT NOT NULL DEFAULT 1,

        is_selected BOOLEAN NOT NULL DEFAULT FALSE,

        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

        UNIQUE (cart_id, product_id)
    );
  `;

  try {
    await pool.query(queryText);
    console.log("Cart tables created if not exists");
  } catch (error) {
    console.log("Error creating cart tables:", error);
  }
};

export default createCartTables;
