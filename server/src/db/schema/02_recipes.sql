DROP TABLE IF EXISTS recipes CASCADE;

CREATE TABLE recipes (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  original_fork_id INTEGER,
  title varchar(50),
  ingredients JSONB,
  equipment_dependencies JSONB,
  instructions JSONB,
  recipe_photos varchar(50), --THIS WILL BE CHANGED ONCE WE KNOW HOW WE ARE GOING TO STORE PHOTOS! PLACEHOLDER FOR NOW
  tags text[],
  forks INTEGER[]
);