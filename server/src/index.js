//index.js is main connection setup
const ENV = require('./environment.js');
const PORT = process.env.PORT || 8001;
const express = require('express');

//PG connection and database setup
const { Pool } = require('pg');
const dbParams = {
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT
};
  //create new db using the dbParams from env file
const db = new Pool(dbParams);
db.connect()
  .then(()=> console.log(`Connected to ${dbParams.database}`))
  .catch(error => console.log(`Error connecting to database. ${error}`));

//main application folder once connection setup
const app = express();
const server = require("http").Server(app);

//Morgan setup
const morgan = require("morgan");
app.use(morgan("dev"));

// Separated Routes for each Resource
// const db = require('./db');
const recipes = require('./routes/recipes');
const users = require('./routes/users');
const { Console } = require('console');

// Mount all resource routes
app.use("/recipes", recipes());
app.use("/users", users());


//message on server start
server.listen(PORT , () => {
  console.log("Its servin' Time!")
  console.log(`Port: ${PORT}, Mode: ${ENV}.`)
});