CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'active',
    role VARCHAR(50) DEFAULT 'admin',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS refresh_tokens (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    token_hash TEXT NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    revoked BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    sku VARCHAR(100) UNIQUE NOT NULL,
    barcode VARCHAR(100) UNIQUE NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    price INT NOT NULL, 
    category VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    vat_type VARCHAR(255) NOT NULL DEFAULT 'vatable',

    stock INT DEFAULT 0,
    stock_low INT DEFAULT 10,
    stock_critical INT DEFAULT 5,
    stock_high INT DEFAULT 20,

    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE stock_movements (
    id SERIAL PRIMARY KEY,
    handled_by INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_id INT NOT NULL REFERENCES products(id) ON DELETE CASCADE,

    reference VARCHAR(255),
    type VARCHAR(10) NOT NULL CHECK (type IN ('IN', 'OUT')),
    quantity INT NOT NULL CHECK (quantity > 0),
    price INT NOT NULL, 

    -- Optional but recommended (audit trail)
    before_stock INT,
    after_stock INT,

    created_at TIMESTAMPTZ DEFAULT NOW()
);