CREATE TABLE IF NOT EXISTS "User" (
                                      id        SERIAL PRIMARY KEY,
                                      username  VARCHAR(255) UNIQUE NOT NULL,
                                      password  VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS "Medication" (
                                        id                  SERIAL PRIMARY KEY,
                                        user_id             INTEGER REFERENCES "User" (id),
                                        name                VARCHAR(255) UNIQUE NOT NULL,
                                        description         TEXT,
                                        count               INT NOT NULL CHECK (count >= 0),
                                        destination_count   INT NOT NULL CHECK (count >= 0),
                                        created_at          VARCHAR(30)
);

