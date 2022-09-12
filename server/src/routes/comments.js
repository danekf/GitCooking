const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const cookieSession = require('cookie-session');
const { response, request } = require('express');

module.exports = (db) => {

  //get all comments for a supplied recipe ID
  router.post('/get', (request,response)=>{
    const {recipeId} = request.body;

    const queryString = `
    SELECT DISTINCT *
    FROM recipe_comments
    WHERE
    recipe_id = $1
    ;`;

    const queryValues = [`${recipeId}`];

    db.query(queryString, queryValues)
      .then(({rows: comments}) => {
        console.log(comments);
        response.send(comments);
      });


  });

  //post a new comment to a supplied recipe ID
  router.post('/add', (response,request)=>{

  });


  return router;
}