CREATE TABLE IF NOT EXISTS orders (
                                      id SERIAL PRIMARY KEY,
                                      "userId" INTEGER NOT NULL,              -- FK to a users table (optional)
                                      "stockId" VARCHAR(20) NOT NULL,         -- e.g. "AAPL", "STK000123"
    "orderType" VARCHAR(4) NOT NULL CHECK ("orderType" IN ('BUY', 'SELL')),
    "price" NUMERIC(10, 2) NOT NULL,         -- limit price per share
    "quantity" INTEGER NOT NULL CHECK (quantity > 0),        -- total shares ordered
    "remainingQuantity" INTEGER NOT NULL,   -- remaining shares to be matched
    "status" VARCHAR(10) NOT NULL DEFAULT 'OPEN' CHECK (status IN ('OPEN', 'PARTIAL', 'FILLED', 'CANCELLED')),
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    "updatedAt" timestamp not null default now()
    );

CREATE TABLE IF NOT EXISTS  users(
                                     id SERIAL PRIMARY KEY ,
                                     name VARCHAR(256) NOT NULL
    )