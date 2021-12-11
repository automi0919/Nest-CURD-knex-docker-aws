import dotenv from 'dotenv';
dotenv.config();

// const AWS = require;

// Update with your config settings.
module.exports = {
  localhost: {
    client: process.env.local_client,
    connection: {
      host: process.env.local_host,
      port: process.env.local_port,
      database: process.env.local_database,
      user: process.env.local_user,
      password: '',
    },
    searchPath: [process.env.local_schema],
    debug: true,
    // ssl: process.env.DATABASE_SSL_DEV === 'true',
    // debug: process.env.DATABASE_DEBUG_DEV === 'true',
    pool: {
       min: 0,
       max: 6,
       idleTimeoutMillis: 10000
    },
  },
  dev: {
    client: process.env.DATABASE_CLIENT_DEV,
    connection: {
      host: process.env.DATABASE_HOST_DEV,
      port: process.env.DATABASE_PORT_DEV,
      database: process.env.DATABASE_DATABASE_DEV,
      user: process.env.DATABASE_USER_DEV,
      password: '',
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
