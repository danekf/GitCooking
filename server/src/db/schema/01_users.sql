DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  profile_picture VARCHAR(255) DEFAULT 'https://e7.pngegg.com/pngimages/261/957/png-clipart-chef-s-uniform-hat-chef-hat-white-hand.png',
  bio VARCHAR (500) DEFAULT 'No Bio',
  contact_email VARCHAR(255),
  facebook VARCHAR(50),
  instagram VARCHAR(50),
  tiktok VARCHAR(50),
  youtube VARCHAR(50),
  twitter VARCHAR(50),
  linkedin VARCHAR(50),
  badges JSONB DEFAULT '[]',
  qualifications JSONB DEFAULT '[]',
  favourite_recipes JSONB DEFAULT '[]',
  login_method VARCHAR(50) DEFAULT 'Git Cooking'
);