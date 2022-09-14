const { response } = require('express');
const express = require('express');
const multer = require('multer');
const router = express.Router();
const path = require('path');
const fs = require('file-system');
const bcrypt = require('bcrypt');

module.exports = (db) => {
   //multer settings for profile picture
   const avatarStorage = multer.diskStorage({
    destination: 'public/avatar',
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  });

  const upload = multer({ storage: avatarStorage });

   //uploads file to DB, and returns the filename;
   router.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
    const file = req.file; 
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }
      res.json({filepath: file})    
  })

  router.post('/', (req, res) => {
    const { username, password, email, first_name, last_name, profile_picture} = req.body;
    // Check for user existing in db before registering
    db.query(`SELECT * FROM users WHERE email = $1 OR username = $2`, [
      email,
      username,
    ]).then((data) => {
      if (data.rows[0]) {
        console.log(data.rows[0])
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
          (first_name, last_name, email, password_hash, username, profile_picture)
          VALUES
          ($1, $2, $3, $4, $5, $6)
          RETURNING *; `;
        const queryValues = [
          `${first_name}`,
          `${last_name}`,
          `${email}`,
          `${password_hash}`,
          `${username}`,
          `${profile_picture}`,
        ];
        db.query(queryString, queryValues).then((user) => {
          console.log(user.rows[0])
          req.session.userId = user.rows[0].id;
          res.json(user.rows);
        });
      }
    });
  });

  return router;
};
