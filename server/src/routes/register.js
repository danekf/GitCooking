const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

module.exports = (db) => {
  router.post('/', (req, res) => {
    const { username, password, email, first_name, last_name } = req.body;
    // Check for user existing in db before registering
    db.query(`SELECT * FROM users WHERE email = $1 OR username = $2`, [
      email,
      username,
    ]).then((data) => {
      if (data.rows[0]) {
        console.log('Rejecting registration');
        res.json({
          error:
            'Username or email already exists, please try logging in instead.',
        });
      } else {
        // Password should be hashed on SERVER side when request is sent. Do it HERE, probably with a helper function for both register and login
        const password_hash = bcrypt.hashSync(password, 10);
        const queryString = `
          INSERT INTO users
          (first_name, last_name, email, password_hash, username)
          VALUES
          ($1, $2, $3, $4, $5)
          RETURNING *; `;
        const queryValues = [
          `${first_name}`,
          `${last_name}`,
          `${email}`,
          `${password_hash}`,
          `${username}`,
        ];
        db.query(queryString, queryValues).then((user) => {
          req.session.userId = user[0].id;
          res.json(user.rows);
        });
      }
    });
  });

  return router;
};
