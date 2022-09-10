const { response } = require('express');
const express = require('express');
const router = express.Router();

module.exports = (db) => {
  //home page, just get recipes of the week, 
  ////////////////////////////////////
  //currently just getting ALL recipes
  ////////////////////////////////////
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

  //get all of a users created recipes
  router.get('/user', (request, response)=>{
    const user_id = request.session.userId;

    const queryString = `
    SELECT *
    FROM recipes
    WHERE user_id = $1
    ;`;

    const queryValues=[`${user_id}`];

    db.query(queryString, queryValues)
      //return an array of objects, grouped by recipe ID.
      .then(({ rows: recipes }) => {
        response.json(recipes);
      });

  });

  //get a users FAVOURITE recipes
  router.get('/favourites', (request, response)=>{
    const user_id = request.session.userId;

    const queryString = `
    SELECT favourite_recipes
    FROM users
    WHERE id = $1
    ;`;

    const queryValues=[`${user_id}`];

    db.query(queryString, queryValues)
      //returns the users favourite recipe IDs
      .then(({rows: data}) => {
        const favourites = (data[0].favourite_recipes); 
        //[1,2,3]^
    
        const queryString = `
        SELECT *
        FROM recipes
        WHERE id = ANY ($1)
        ;`;        

      //returns the recipe data for favourite recipes
      db.query(queryString, [favourites])
      .then(({ rows: recipes }) => {
        response.json(recipes);
      });     
      })
  });

  router.post('/recipeId', (request, response) => {
    const {recipeId} = request.body;
    const queryString = `
    SELECT *
    FROM recipes
    WHERE id = $1
    ;`;


    db.query(queryString, [`${recipeId}`])
      // Return an array of objects, grouped by recipe ID.
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

  //edit an existing recipe
  router.post('/edit', (request, response)=>{
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
      UPDATE recipes
      SET
        title = $2, 
        ingredients = $3,
        equipment = $4,
        instructions = $5,
        recipe_photos = $6,
        tags = $7,
        servings = $8
      WHERE
      id = $1 `
      ;

      const queryValues = [`${user_id}`,`${title}`,`${ingredients}`,`${equipment}`,`${instructions}`,`${recipe_photos}`,`${tags}`,`${servings}`];
      console.log(queryValues)

      db.query(queryString, queryValues)
        .then((response) => {
          res.sendStatus(200)
        })
        .catch((error) => console.log(error));
  });


  return router;
};
