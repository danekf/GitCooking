const express = require('express');
const router = express.Router();

module.exports = (db) => {

  //basic search for any value that matches the search
  router.post('/', (req, res) => {
    const {searchText} = req.body;

    // Search string
    const queryString = `
    SELECT *
    FROM recipes
    WHERE 
    (
      title LIKE $1
    )
    `;

    const queryValues = [`${searchText}`];

    db.query(queryString, queryValues)
    .then(({rows: recipes}) => {
      console.log(recipes)
      res.json(recipes)
    });
  });

  return router;
};
