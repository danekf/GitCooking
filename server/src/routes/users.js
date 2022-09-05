const express = require('express');
const router = express.Router();

module.exports = () => {
  
  router.get('/login', (request, response)=>{
    console.log('Users login requested');
  });



  return router;
}