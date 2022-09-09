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

  return router;
};
