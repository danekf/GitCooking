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

// Message on server start
server.listen(PORT, () => {
  console.log("Its servin' Time!");
  console.log(`Port: ${PORT}, Mode: .`, ENV);
});


// Multer file upload

// app.get('/uploadFile', upload.single('avatar'), function (req, res) {
//   let fileType = req.file.mimetype.split("/")[1];
//   let newFileName = req.file.filename + "." + fileType

//   fs.rename(`./uploads/${req.file.filename}`, `./uploads/${newFileName}`, function() {
//     res.send("200");
//   })

//   // req.file is the `avatar` file
//   // req.body will hold the text fields, if there were any
// })


// Tell multer where to upload images
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, '../../client/uploads')
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname)
//   }
// })
// const upload = multer({ storage: storage })


app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));

// app.post('/profile-upload-single', upload.single('profile-file'), function (req, res, next) {
//   // req.file is the `profile-file` file
//   // req.body will hold the text fields, if there were any
//   console.log(JSON.stringify(req.file))
//   let response = '<a href="/">Home</a><br>'
//   response += "Files uploaded successfully.<br>"
//   response += `<img src="${req.file.path}" /><br>`
//   return res.send(response)
// })


// app.post('/recipe-upload', upload.array('recipe-files', 3), function (req, res, next) {
//   // req.files is array of `profile-files` files
//   // req.body will contain the text fields, if there were any
//   let response = '<a href="/">Home</a><br>'
//   response += "Files uploaded successfully.<br>"
//   for(let i=0;i<req.files.length;i++){
//       response += `<img src="${req.files[i].path}" /><br>`
//   }
  
//   return res.send(response)
// })