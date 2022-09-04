//index.js is main connection setup
const ENV = require('./environment.js');
const PORT = process.env.PORT || 8001;
const express = require('express');

//main application folder once connection setup
const app = express();
const server = require("http").Server(app);

//Morgan setup
const morgan = require("morgan");
app.use(morgan("dev"));




// Separated Routes for each Resource
// const db = require('./db');
const recipes = require('./routes/recipes');

// Mount all resource routes
app.use("/recipes", recipes());
//message on server start
server.listen(PORT , () => {
  console.log("Its servin' Time!")
  console.log(`Port: ${PORT}, Mode: ${ENV}.`)
});