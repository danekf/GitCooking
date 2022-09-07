const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.post('/', (req, res) => {
    const { username, password } = req.body;
    //Password should be hashed on SERVER side when request is sent. Do it HERE, probably with a helper function for both register and login
    const password_hash = password; //+ bcrypt stuff

    //search string
    const queryString = `
    SELECT *
    FROM users
    WHERE email = $1
    OR username = $1`;

    const queryValues = [`${username}`];

    db.query(queryString, queryValues)
      .then(({ rows: users }) => {
        if (!users[0]) {
          res.json({ error: 'Username or email not found.' });
        } else if (password_hash != users[0].password_hash) {
          res.json({ error: 'Password is incorrect.' });
        } else {
          //pass, return user data
          res.json(users[0]);
        }
      })
      .catch((error) => console.log(error));
  });

  return router;
};
