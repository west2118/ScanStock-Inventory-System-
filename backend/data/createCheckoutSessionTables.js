import pool from "../config/db.js";

const createCheckoutSessionTables = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS checkout_sessions (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

      customer_id INT NOT NULL
        REFERENCES users(id)
        ON DELETE CASCADE,

      status VARCHAR(50) NOT NULL DEFAULT 'active',

      expires_at TIMESTAMPTZ NOT NULL,

      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS checkout_session_items (
      id SERIAL PRIMARY KEY,

      checkout_session_id UUID NOT NULL
        REFERENCES checkout_sessions(id)
        ON DELETE CASCADE,

      product_id INT NOT NULL
        REFERENCES products(id)
        ON DELETE RESTRICT,

      quantity INT NOT NULL DEFAULT 1,

      price NUMERIC(12,2) NOT NULL,

      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `;

  try {
    await pool.query(queryText);
    console.log("Checkout tables created if not exists");
  } catch (error) {
    console.log("Error creating checkout tables:", error);
  }
};

export default createCheckoutSessionTables;
