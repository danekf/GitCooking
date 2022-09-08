const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const cookieSession = require('cookie-session');

module.exports = (db) => {
  router.post('/', (req, res) => {
    const { username, password } = req.body;
    //Password should be hashed on SERVER side when request is sent. Do it HERE, probably with a helper function for both register and login
    const password_hash = bcrypt.hashSync(password, 10)

    //search string
    const queryString = `
    SELECT *
    FROM users
    WHERE email = $1
    OR username = $1`;

    const queryValues = [`${username}`];

    db.query(queryString, queryValues)
      .then(({ rows: users }) => {
        //set session cookie, with the logged in users username
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
