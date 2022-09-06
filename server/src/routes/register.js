const express = require('express');
const router = express.Router();

//check for username/email before registering user
const checkForuser = (username, db) => {
  const queryString = `
    SELECT *
    FROM users
    WHERE email = $1
    OR username = $1`

  const queryValues = [`${username}`];

  db.query(queryString, queryValues)
  .then(({rows: users}) => {
    //bcrypt the password on the client side BEFORE SENDING to server. Server should not handle the password as far as I know. Must confirm.
    console.log(`Users data: `, users)
    
    if (users[0] ){
      return true;
    }
    return false;
  });
};


module.exports = (db) => {  

  router.post('/', (req, res) => {
    const {username, password, email, first_name, last_name} = req.body;
    ////TESTING ONLY - DELETE ME ///////
    console.log('User input for registration');
    console.log(req.body);
    ////////////////////////////////////

    //check for user existing in db before registering
    if(checkForuser(username, db)){
      res.json("Username or email already exists, plese try loggin in instead!")
    };

    //Password should be hashed on SERVER side when request is sent. Do it HERE, probably with a helper function for both register and login
    const password_hash = password //+ bcrypt stuff   

    const queryString = `
    INSERT INTO users
    (first_name, last_name, email, password_hash, username)
    VALUES
    ($1, $2, $3, $4, $5)
    RETURNING *; `;

    const queryValues = [`${first_name}`,`${last_name}`,`${email}`,`${password_hash}`,`${username}`];

    db.query(queryString, queryValues)
    .then((user)=>{
      console.log(user.rows);
      res.json(user.rows);
    })

  });




  return router;
}