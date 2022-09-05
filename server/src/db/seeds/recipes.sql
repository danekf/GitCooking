DROP TABLE IF EXISTS recipes CASCADE;

CREATE TABLE recipes (
  id SERIAL PRIMARY KEY NOT NULL,
  social_URLS TEXT[],
  badges TEXT[],
  qualifications TEXT[],
  login_method VARCHAR(50)
);