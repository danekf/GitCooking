// Index.js is main connection setup
const ENV = require('dotenv').config();
const PORT = process.env.PORT || 8080;
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieSession = require('cookie-session');
const fs = require('fs');


// PG connection and database setup
const { Pool } = require('pg');

const dbParams = {
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
};

const db = new Pool(dbParams);

db.connect()
  .then(() => console.log(`Connected to ${dbParams.database}`))
  .catch((error) => console.log(`Error connecting to database. ${error}`));

// Main application folder once connection setup
const app = express();
const server = require('http').Server(app);

// CORS setup
app.use(cors());

// Morgan setup
const morgan = require('morgan');
app.use(morgan('dev'));

// Cookie session set up
app.use(
  cookieSession({
    name: 'session',
    keys: ['breakfast lunch and dinner', 'cooking all the time'], // Just some keys to cycle through
  })
);

// Body parser middleware and json handler
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Separated Routes for each Resource
// const db = require('./db');
const recipes = require('./routes/recipes');
const login = require('./routes/login');
const register = require('./routes/register');
const logout = require('./routes/logout');
const users = require('./routes/users');
const profiles = require('./routes/profiles');
const { fstat } = require('fs');


// Mount all resource routes
app.use('/api/recipes', recipes(db));
app.use('/api/login', login(db));
app.use('/api/register', register(db));
app.use('/api/logout', logout());
app.use('/api/users', users(db));
app.use('/api/profile', profiles(db));

//static folder for images
app.use(express.static('public'));


// Message on server start
server.listen(PORT, () => {
  console.log("Its servin' Time!");
  console.log(`Port: ${PORT}, Mode: .`, ENV);
});


app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));

