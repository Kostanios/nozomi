CREATE TABLE IF NOT EXISTS "Medication" (
                                            id SERIAL PRIMARY KEY,
                                            name VARCHAR(255) NOT NULL,
                                            description TEXT,
                                            count INTEGER,
                                            destination_count INTEGER
);

CREATE TABLE IF NOT EXISTS "User" (
                                      id SERIAL PRIMARY KEY,
                                      name VARCHAR(255) NOT NULL,
                                      password VARCHAR(255) NOT NULL,
                                      medication_id INTEGER REFERENCES "Medication"(id)
);

CREATE TABLE jwt (
                     id SERIAL PRIMARY KEY,
                     user_id INTEGER REFERENCES "User"(id),
                     token TEXT NOT NULL
);