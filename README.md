## Setting up Enviroment 

Change or add env variables 

Example
```
DATABASE_CLIENT_DEV="pg" 
DATABASE_HOST_DEV="your-group-postgresql-instance-primary-dev.abcdef.us-east-1.rds.amazonaws.com" # your database host 
DATABASE_PORT_DEV=5432  # postgres port
DATABASE_DATABASE_DEV="cmpappdb1" # database name
DATABASE_USER_DEV="lambdacmprdsrw"  # username
DATABASE_SCHEMA_DEV="bmme_metric_repo"  # schema
``` 

 
Update with the variables `knexfile.ts`.
```ts 
import dotenv from 'dotenv'; 
dotenv.config(); 

// Update with your config settings. 
module.exports = { 
  bmmeMetricRepoDatabase: {  // this key can be change but need to change for both [db-injector.ts](./src/db/db-injector.ts:68)
    client: process.env.DATABASE_CLIENT_DEV, 
    connection: { 
      host: process.env.DATABASE_HOST_DEV, 
      port: process.env.DATABASE_PORT_DEV, 
      database: process.env.DATABASE_DATABASE_DEV, 
      user: process.env.DATABASE_USER_DEV, 
      // password: '',  this project use aws token instead of password.
    }, 
    searchPath: [process.env.DATABASE_SCHEMA_DEV], 
    debug: true, 
    // ssl: process.env.DATABASE_SSL === 'true', 
    // debug: process.env.DATABASE_DEBUG_DEV === 'true', 
    pool: { 
      min: 0, 
      max: 6, 
      idleTimeoutMillis: 10000 
    }, 
  }, 
}; 
``` 

## How to set multiple environemt
Update with the variables `knexfile.ts`.
```ts 
import dotenv from 'dotenv'; 
dotenv.config(); 

// Update with your config settings. 
module.exports = { 
  development: {
    client: 'pg', 
    connection: { 
      host: 'db_host', 
      port: 'db_port', 
      database: 'db_name, 
      user: 'db_username, 
    }, 
    searchPath: [process.env.DATABASE_SCHEMA_DEV], 
    debug: true, 
    // ssl: process.env.DATABASE_SSL === 'true', 
    // debug: process.env.DATABASE_DEBUG_DEV === 'true', 
    pool: { 
      min: 0, 
      max: 6, 
      idleTimeoutMillis: 10000 
    }, 
  }, 
  test: {
    client: 'pg', 
    connection: { 
      host: 'db_host', 
      port: 'db_port', 
      database: 'db_name, 
      user: 'db_username, 
    }, 
    searchPath: [process.env.DATABASE_SCHEMA_DEV], 
    debug: true, 
    // ssl: process.env.DATABASE_SSL === 'true', 
    // debug: process.env.DATABASE_DEBUG_DEV === 'true', 
    pool: { 
      min: 0, 
      max: 6, 
      idleTimeoutMillis: 10000 
    }, 
  }, 
  production: {
    client: 'pg', 
    connection: { 
      host: 'db_host', 
      port: 'db_port', 
      database: 'db_name, 
      user: 'db_username, 
    }, 
    searchPath: [process.env.DATABASE_SCHEMA_DEV], 
    debug: true, 
    // ssl: process.env.DATABASE_SSL === 'true', 
    // debug: process.env.DATABASE_DEBUG_DEV === 'true', 
    pool: { 
      min: 0, 
      max: 6, 
      idleTimeoutMillis: 10000 
    }, 
  }, 
}; 
``` 
You should update the line 68 of [db-injector.ts](./src/db/db-injector.ts)
```ts
configByEnvironment = dbConfig[process.env.NODE_ENV];
```
## Installation

```bash
$ npm i -g @nestjs/cli # instlal nestjs cli

$ npm install # install dependencies
```

## Prerequisites for running the app 
1. Docker must be up and running 
2. pgAdmin must be set up with a database, username and password 
   `docker-compose up`
3. aws saml must be logined

## Creating an API
```bash
# creating an API resource(controller, modue, service) at one go with basic CRUD entry points
$ nest generate resource [name]

# module
$ nest g mo [apiName] 

# service
$ nest g s [apiName]  

# controller
$ nest g co [apiName]  
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test 

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


## !! TODO After changes 

* You will need to run API builder job to apply changes to aws server. 
