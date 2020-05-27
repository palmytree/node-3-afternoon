CREATE TABLE IF NOT EXISTS product(
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(40),
    description VARCHAR(80),
    price INT,
    image_url TEXT
);