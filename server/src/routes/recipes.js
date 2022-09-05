const express = require('express');
const router = express.Router();

module.exports = (db) => {
  
  //home page, just get recipes of the week, currently just getting ALL recipes
  router.get('/', (request, response)=>{
    
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



  return router;
}