const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');

module.exports = (db) => {
  
  router.post('/', (req, res) => {
    ////TESTIG///
    console.log('logout requested');
    ////////////
    req.session = null;
    res.end();
  });

  return router;
}
