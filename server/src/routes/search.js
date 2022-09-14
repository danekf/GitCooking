const express = require('express');
const router = express.Router();

module.exports = (db) => {

  //basic search for any value that matches the search
  router.post('/', (req, res) => {
    const {searchText} = req.body;
    console.log('incoming search for ', searchText)
    // Search string
    const queryString = `
    SELECT recipes.id, users.username, recipes.original_fork_id, recipes.title, recipes.ingredients, recipes.equipment, recipes.estimatedTime, recipes.recipe_photos, recipes.tags, recipes.forks, recipes.servings
    FROM recipes
    INNER JOIN users ON users.id = user_id
    WHERE 
    (
      title LIKE $1      
      OR users.username LIKE $1

      OR $2 = ANY (tags)        
    )
    `;

    const queryValues = [`%${searchText}%`, `${searchText}` ];

    db.query(queryString, queryValues)
    .then(({rows: recipes}) => {
      //if we find basic results, return them here
      console.log('recipes found: ',recipes)
      if(recipes.length > 0){
        res.json(recipes)
      }
      else{
        res.json({Error: 'No results found'})
      }


    });
  });

  return router;
};
