const { response } = require('express');
const express = require('express');
const multer = require('multer');
const router = express.Router();
const path = require('path');
const fs = require('file-system');

module.exports = (db) => {
   //multer settings for new recipe
   const recipeStorage = multer.diskStorage({
    destination: 'public/recipePhotos',
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  });

  const upload = multer({ storage: recipeStorage });

  ///////////////////////////////
  //TEST
  ///////////////////////////////
  router.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
    const file = req.file; 
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }
      res.json({filepath: file})    
  })
  ///////////////////////////////
  ///////////////////////////////



  // Home page, just get recipes of the week,
  ////////////////////////////////////
  // Currently just getting ALL recipes
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

  // Get all of a users created recipes
  router.get('/user', (request, response) => {
    const user_id = request.session.userId;

    const queryString = `
    SELECT *
    FROM recipes
    WHERE user_id = $1
    ;`;

    const queryValues = [`${user_id}`];

    db.query(queryString, queryValues)
      // Return an array of objects, grouped by recipe ID.
      .then(({ rows: recipes }) => {
        response.json(recipes);
      });
  });

  // Get a users FAVOURITE recipes
  router.get('/favourites', (request, response) => {
    const user_id = request.session.userId;

    const queryString = `
    SELECT favourite_recipes
    FROM users
    WHERE id = $1
    ;`;

    const queryValues = [`${user_id}`];

    db.query(queryString, queryValues)
      // Returns the users favourite recipe IDs
      .then(({ rows: data }) => {
        const favourites = data[0].favourite_recipes;
        //[1,2,3]^

        const queryString = `
        SELECT *
        FROM recipes
        WHERE id = ANY ($1)
        ;`;

        // Returns the recipe data for favourite recipes
        db.query(queryString, [favourites]).then(({ rows: recipes }) => {
          response.json(recipes);
        });
      });
  });


  router.post('/recipeId', (request, response) => {
    const { recipeId } = request.body;
    const queryString = `
    SELECT *
    FROM recipes
    WHERE id = $1
    ;`;

    db.query(queryString, [`${recipeId}`])
      // Returns an array of objects, grouped by recipe ID.
      .then(({ rows: recipes }) => {
        response.json(recipes);
      });
  });
  

  // Save a new recipe to the db
  router.post('/new', upload.single('recipe_photos'), (request, response) => {
    const { user_id, original_fork_id, title, servings } =
      request.body;

    // Black magic to make it work with pg, more greyish white magic actually.
    const ingredients = JSON.stringify(request.body.ingredients);
    const equipment = JSON.stringify(request.body.equipment);
    const instructions = JSON.stringify(request.body.instructions);
    const recipe_photos =request.body.recipe_photos;
    upload.single('recipe_photos');
    
  

    // Black magic to mage an array work when inputting into pg
    // Do not delete the black magic, or these comments about black magic. It is important to keep them.
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
    RETURNING *;`;
    const queryValues = [
      `${user_id}`,
      `${original_fork_id}`,
      `${title}`,
      `${ingredients}`,
      `${equipment}`,
      `${instructions}`,
      `${request.hostname +'/' + request.file.path}`,
      `${tags}`,
      `${servings}`,
    ];
    console.log(queryValues);

    db.query(queryString, queryValues).then(({ rows: recipe }) => {
      response.json(recipe);
    });
    
  });


//   router.post('/new', upload.single('file'), function(req,res) {
//     console.log('storage location is ', req.hostname +'/' + req.file.path);
//     return res.send(req.file);
// })

  // Edit an existing recipe
  router.post('/edit', upload.single('recipe_photos'), (request, response) => {
    
    const { id, user_id, original_fork_id, title, servings } =
      request.body;

    // Black magic to make it work with pg, more greyish white magic actually.
    const ingredients = JSON.stringify(request.body.ingredients);
    const equipment = JSON.stringify(request.body.equipment);
    const instructions = JSON.stringify(request.body.instructions);
    const recipe_photos = JSON.stringify(request.body.recipe_photos);


    // Black magic to mage an array work when inputting into pg
    // Do not delete the black magic, or these comments about black magic. It is important to keep them.
    const tags = JSON.stringify(request.body.tags)
      .replace('[', '{')
      .replace(']', '}');

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
      id = $1 `;
    const queryValues = [
      `${id}`,
      `${title}`,
      `${ingredients}`,
      `${equipment}`,
      `${instructions}`,
      `${recipe_photos}`,
      `${tags}`,
      `${servings}`,
    ];
 
    db.query(queryString, queryValues)
      .then(() => {
        response.sendStatus(200);
      })
      .catch((error) => console.log(error));
  });

  //update favourites
  router.post('/favourite', (request, response) =>{
    const user_id = request.session.userId;
    const {id} = request.body;
    const favourite_recipes = JSON.stringify(request.body.favourite_recipes);
    
    

    const queryString = `
      UPDATE users
      SET
        favourite_recipes = $1
      WHERE
        id = $2
      ;`;

      const queryValues = [`${favourite_recipes}`, `${user_id}`];

      db.query(queryString, queryValues)
        .then(()=>{
          response.sendStatus(200);
        })
  });

  return router;
};


