const express = require('express');
const router = express.Router();

module.exports = (db) => {
  
  //it is a get request because they are trying to log in
  router.post('/', (req, res) => {

    ////delete me, testing logs/////
    console.log('Incoming login request')
    console.log(req.body)
    // ////////////////////////////////

    const {username, password} = req.body;

    //Password should be hashed on SERVER side when request is sent. Do it HERE.
    const password_hash = password //+ bcrypt stuff

    //search string
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
        
        if (!users[0] ){
          res.json({Error: "Username or email not found."})

        } else if(password_hash != users[0].password_hash) {
          res.json({Error: "Password is incorrect."})

        } else{
          //pass, return user data
          res.json(users[0])
        }
      })
      .catch(error => console.log(error));

  });




  return router;
}