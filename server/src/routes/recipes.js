const { response } = require('express');
const express = require('express');
const router = express.Router();

module.exports = (db) => {
  //home page, just get recipes of the week, currently just getting ALL recipes
  router.get('/', (request, response) => {
    const queryString = `
    SELECT *
    FROM recipes
    ;`;

    db.query(queryString)
      //return an array of objects, grouped by recipe ID.
      .then(({ rows: recipes }) => {
        response.json(recipes);
      });
  });

  router.post('/new', (request, response)=>{
    const {user_id, original_fork_id, title, ingredients, equipment, instructions, recipe_photos, tags, forks, servings } = request.body;

    const queryString = `
    INSERT INTO recipes
      (user_id, original_fork_id, title, ingredients, equipment, instructions, recipe_photos, tags, forks, servings)
    VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *;`
    ;

    const queryValues = [`${user_id}`, `${original_fork_id}`, `${title}`, `${ingredients}`, `${equipment}`, `${instructions}`, `${recipe_photos}`, `${tags}`, `${forks}`, `${servings}`];

    db.query(queryString, queryValues)
      .then(({ rows: recipe }) =>{
        response.json(recipe)
      });
  });

  return router;
};
