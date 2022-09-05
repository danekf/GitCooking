require("dotenv").config();

//PG connection and database setup
const {Client} = require('pg');
const dbParams = {
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT
};
const db = new Client(dbParams);

