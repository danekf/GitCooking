const express = require('express');
const router = express.Router();


module.exports = (db) => {
  router.post('/', (req, res) => {
    const { userId } = req.body;

    // Search string
    const queryString = `
    SELECT *
    FROM users
    WHERE id = $1`;

    const queryValues = [`${userId}`];

    db.query(queryString, queryValues)
      .then(({ rows: users }) => {
          res.json(users[0]);
        })
      })

  return router;
};