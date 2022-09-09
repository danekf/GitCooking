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

  //get all of a users created recipes
  router.get('/:userid', (request, response)=>{
    const user_id = request.session.userId;

    const queryString = `
    SELECT *
    FROM recipes
    WHERE user_id = 1
    ;`;

    const queryValues=[`${user_id}`];

    db.query(queryString)
      //return an array of objects, grouped by recipe ID.
      .then(({ rows: recipes }) => {
        response.json(recipes);
      });

  });

  //get a users FAVOURITE recipes
  router.get('/:userid/favourites', (request, response)=>{
    const user_id = request.session.userId;

    const queryString = `
    SELECT *
    FROM recipes
    WHERE user_id = 1
    ;`;

    const queryValues=[`${user_id}`];

    db.query(queryString)
      //return an array of objects, grouped by recipe ID.
      .then(({ rows: recipes }) => {
        response.json(recipes);
      });

  });

  //save a new recipe to the db
  router.post('/new', (request, response)=>{
    const {user_id, original_fork_id, title, recipe_photos, servings } = request.body;

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
