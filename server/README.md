## GitCooking Server 

## Setup

Install dependencies with `npm install`.

## Creating The Dev DB

Use the `psql -U development` command to login to the PostgreSQL server with the username `development` and the password `development`. You may sub the username and password for your preferred development credentials.

Create a database with the command `CREATE DATABASE GitCooking_development;`. 

Copy the `.env.example` file to `.env.development` and fill in the necessary PostgreSQL configuration. The `node-postgres` library uses these environment variables by default.


```
PGHOST=localhost
PGUSER=development
PGDATABASE=GitCooking_development
PGPASSWORD=development
PGPORT=5432
```

If you have changed any values, ensure that they are reflected in your ENV file.

## Seeding for development

Run a the development server with `npm seed`