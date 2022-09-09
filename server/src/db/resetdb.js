require('dotenv').config();
const fs = require('fs');

// PG connection and database setup
const { Client } = require('pg');
const dbParams = {
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
};
const db = new Client(dbParams);

// Loads the schema files from db/schema
const runSchemaFiles = async () => {
  console.log('Loading Schema Files ...');
  // Directory must be relative to where the file is called from, so here its a relative path from the package.json that calls resetdb.js. Not sure why, but this is how it works.
  const schemaFilenames = fs.readdirSync('./src/db/schema');

  for (const fn of schemaFilenames) {
    const sql = fs.readFileSync(`./src/db/schema/${fn}`, 'utf8');
    console.log(`-> Running ${fn}`);
    await db.query(sql);
  }
};

const runSeedFiles = async () => {
  console.log('Loading Seed Files ...');
  const schemaFilenames = fs.readdirSync('./src/db/seeds');

  for (const fn of schemaFilenames) {
    const sql = fs.readFileSync(`./src/db/seeds/${fn}`, 'utf8');
    console.log(`-> Running ${fn}`);
    await db.query(sql);
  }
};

// Reset DB function
const runResetDB = async () => {
  // Attempt to connect to the DB
  try {
    dbParams.host &&
      console.log(
        `-> Connecting to PG on ${dbParams.host} as ${dbParams.user}...`
      );
    dbParams.connectionString &&
      console.log(`-> Connecting to PG with ${dbParams.connectionString}...`);
    await db.connect();

    // Once connected, run the schema files and seed files
    await runSchemaFiles();
    await runSeedFiles();
    db.end();
  } catch (err) {
    console.error(`Failed due to error: ${err}`);
    db.end();
  }
};

runResetDB();
