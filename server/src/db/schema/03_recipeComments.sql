DROP TABLE IF EXISTS recipe_comments CASCADE;

CREATE TABLE recipe_comments (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  recipe_id INTEGER REFERENCES recipes(id),
  created_at TIMESTAMP,
  comment VARCHAR(255)
);