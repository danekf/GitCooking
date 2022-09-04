const pg = require('pg');

//connect to db with ENV data
const client = new pg.Client({
  connectionString: process.env.DATABASE_URL || "",
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

client 
  .connect()
  .catch(error => {
    console.log('Error connecting to Postgres server:');
    console.log(error);
});

module.exports = client;