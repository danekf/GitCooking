DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL,
  bio VARCHAR (500),
  contact_email VARCHAR(255),
  social_URLS JSONB,
  badges JSONB,
  qualifications JSONB,
  favourite_recipes JSONB,
  login_method VARCHAR(50)
);