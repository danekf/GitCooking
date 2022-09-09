const { response } = require('express');
const express = require('express');
const router = express.Router();

module.exports = (db) => {
  // Home page, just get recipes of the week, currently just getting ALL recipes
  router.get('/', (request, response) => {
    const queryString = `
    SELECT *
    FROM recipes
    ;`;

    db.query(queryString)
      // Return an array of objects, grouped by recipe ID.
      .then(({ rows: recipes }) => {
        response.json(recipes);
      });
  });

  router.post('/new', (request, response)=>{
    const {user_id, original_fork_id, title, recipe_photos, servings } = request.body;
    console.log(request.body)  

  //black magic to make it work with pg, more greyish white magic actually.
  const ingredients = JSON.stringify(request.body.ingredients);
  const equipment = JSON.stringify(request.body.equipment);
  const instructions = JSON.stringify(request.body.instructions);
  
  //black magic to mage an array work when inputting into pg
  //do not delete the black magic, or these comments about black magic. It is important to keep them.
  const tags = JSON.stringify(request.body.tags)
    .replace('[', '{')
    .replace(']', '}');


   console.log('type of: ', typeof tags);
   console.log(tags);

    const queryString = `
    INSERT INTO recipes
      (user_id, original_fork_id, title, ingredients, equipment, instructions, recipe_photos, tags, servings)
    VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *;`
    ;

    const queryValues = [`${user_id}`, `${original_fork_id}`, `${title}`, `${ingredients}`, `${equipment}`, `${instructions}`, `${recipe_photos}`, `${tags}`, `${servings}`];
    console.log(queryValues)

    db.query(queryString, queryValues)
      .then(({ rows: recipe }) =>{
        response.json(recipe)
      });
  });

  return router;
};
