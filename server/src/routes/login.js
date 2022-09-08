const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const cookieSession = require('cookie-session');

module.exports = (db) => {
  // router.get('/' , (req, res) => {
  // //if user already logged in, just send user data
  //   const queryString = `
  //   SELECT *
  //   FROM users
  //   WHERE id = $1`;
  //   const queryValues = [`${req.session.userId}`];
  //   db.query(queryString, queryValues)
  //     .then(({rows:users})=>      
  //     res.json(users[0]))
  //     res.redirect('/')

  // });

  router.post('/', (req, res) => {
    
    const { username, password } = req.body;

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
        } else if (!bcrypt.compareSync(password, users[0].password_hash)) {
          res.json({ error: 'Password is incorrect.' });
        } else {
          //pass, return user data
          req.session.userId=users[0].id;
          res.redirect("/");
        }
      })
      .catch((error) => console.log(error));
  });



  return router;
};
