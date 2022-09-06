//index.js is main connection setup
const ENV = require("dotenv").config();
const PORT = process.env.PORT || 8080;
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//PG connection and database setup
const { Pool } = require('pg');
const dbParams = {
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT
};
const db = new Pool(dbParams);
db.connect()
  .then(()=> console.log(`Connected to ${dbParams.database}`))
  .catch(error => console.log(`Error connecting to database. ${error}`));

//main application folder once connection setup
const app = express();
const server = require("http").Server(app);

// //cors setup
app.use(cors());

//Morgan setup
const morgan = require("morgan");
app.use(morgan("dev"));

//body parser middleware and json handler
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Separated Routes for each Resource
// const db = require('./db');
const recipes = require('./routes/recipes');
const login = require('./routes/login');


// Mount all resource routes
app.use("/api/recipes", recipes(db));
app.use("/api/login", login(db));


//message on server start
server.listen(PORT , () => {
  console.log("Its servin' Time!")
  console.log(`Port: ${PORT}, Mode: .`, ENV)
});