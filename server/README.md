## GitCooking Server 

## Setup

Install dependencies with `npm install`.

## Creating The Dev DB

Use the `psql -U development` command to login to the PostgreSQL server with the username `development` and the password `development`. You may sub the username and password for your preferred development credentials.

Create a database with the command `CREATE DATABASE gitcooking_development;`. 

Copy the `.env.example` file to `.env.development` and fill in the necessary PostgreSQL configuration. The `node-postgres` library uses these environment variables by default.


```
PGHOST=localhost
PGUSER=development
PGDATABASE=gitcooking_development
PGPASSWORD=development
PGPORT=5432
```

If you have changed any values, ensure that they are reflected in your ENV file.

## Seeding for development

Seed the development server with `npm run resetdb`. This will run all schema files and then all seed files. This will allow you to easily add tables and seed datato the database.

## Running dev server

Run the server in development mode with `npm run local`. This will start the server with nodemon.