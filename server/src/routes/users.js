const express = require('express');
const router = express.Router();

module.exports = (db) => {
  
  //it is a get request because they are trying to log in
  router.get('/login', (request, response)=>{
    //from client request
    const username = req.body.username;
    const password_hash = req.body.password;

    //////delete me, testing logs/////
    console.log(`Username: ${username}, password: ${password_hash}`)
    //////////////////////////////////

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

        
        if (!users[0] ){
          response.json({Error: "Username or email not found."})

        } else if(password_hash != users[0].password_hash) {
          response.json({Error: "Password is incorrect."})

        } else{
          //pass, return user data
          response.json(users[0])
        }
      })
      .catch(error => console.log(error));

  });




  return router;
}