CREATE TABLE users (
  id UUID PRIMARY KEY,
  first_name VARCHAR,
  last_name VARCHAR,
  created_at TIMESTAMP,
  billing_address_street VARCHAR,
  billing_address_city VARCHAR,
  billing_address_county VARCHAR,
  billing_address_postcode VARCHAR
);

CREATE TABLE cart (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  created_at TIMESTAMP,
  is_empty BOOLEAN,
  total_price DECIMAL
);

CREATE TABLE categories (
  id UUID PRIMARY KEY,
  name VARCHAR,
  description TEXT
);

CREATE TABLE products (
  id UUID PRIMARY KEY,
  name VARCHAR,
  price DECIMAL,
  description TEXT,
  category_id UUID REFERENCES categories(id),
  stock_quantity INTEGER
);

CREATE TABLE cart_items (
  id UUID PRIMARY KEY,
  cart_id UUID REFERENCES cart(id),
  product_id UUID REFERENCES products(id),
  quantity INTEGER
);

CREATE TABLE orders (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  created_at TIMESTAMP,
  order_status VARCHAR,
  total_price DECIMAL,
  shipping_address_street VARCHAR,
  shipping_address_city VARCHAR,
  shipping_address_county VARCHAR,
  shipping_address_postcode VARCHAR
);

CREATE TABLE order_items (
  id UUID PRIMARY KEY,
  order_id UUID REFERENCES orders(id),
  product_id UUID REFERENCES products(id),
  quantity INTEGER
);

