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
    SELECT recipe_comments.id, users.username, recipe_comments.recipe_id, recipe_comments.created_at, recipe_comments.comment
    FROM recipe_comments
    INNER JOIN users ON users.id = user_id
    WHERE
    recipe_id = $1
    ;`;

    const queryValues = [`${recipeId}`];

    db.query(queryString, queryValues)
      .then(({rows: comments}) => {
        response.send(comments);
      });
  });

  //post a new comment to a supplied recipe ID
  router.post('/add', (request, response)=>{
    const {comment, recipeId} = request.body;
    const user_id = request.session.userId;
    
    const queryString = `
    INSERT INTO recipe_comments (user_id, recipe_id, comment, created_at)
    VALUES(
    $1,
    $2,
    $3,
    NOW()
    );`

    const queryValues = [`${user_id}`,`${recipeId}`,`${comment}`]

    db.query(queryString, queryValues)
      .then(()=>{
        response.sendStatus(200);
      })

  });


  return router;
}