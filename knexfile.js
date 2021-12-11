// Update with your config settings.
const knexDataApiClient = require('knex-aurora-data-api-client');

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host: 'nest-test.cwbf2u9ksjno.us-east-1.rds.amazonaws.com',
      port: 5432,
      user: 'postgres',
      password: 'Anixter$2020',
      database: 'nest-test',
    },
    debug: true
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'nest-test',
      user:     'postgres',
      password: 'Anixter$2020'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    // client: 'postgresql',
    // connection: {
    //   host: 'nest-test.cwbf2u9ksjno.us-east-1.rds.amazonaws.com',
    //   port: 5432,
    //   database: 'my_db',
    //   user:     'postgress',
    //   password: 'Anixter$2020'
    // },
    // pool: {
    //   min: 2,
    //   max: 10
    // },
    // migrations: {
    //   tableName: 'knex_migrations'
    // }
    client: knexDataApiClient.postgres,
    connection: {
      secretArn: 'arn:aws:secretsmanager:us-east-1:982275366612:secret:nest-post-XGM5mo', // Required
      resourceArn: 'arn:aws:rds:us-east-1:982275366612:db:nest-test', // Required
      database: 'nest-test', // db name
      region: 'us-east-1', // region
    },
  },

  test: {
    client: process.env.BMME_METRIC_REPO_DATABASE_CLIENT,
    connection: {
      host: process.env.BMME_METRIC_REPO_DATABASE_HOST,
      port: process.env.BMME_METRIC_REPO_DATABASE_PORT,
      database: process.env.BMME_METRIC_REPO_DATABASE_DATABASE,
      user: process.env.BMME_METRIC_REPO_DATABASE_USER,
      password: process.env.BMME_METRIC_REPO_DATABASE_PWD,
    },
    searchPath: [process.env.BMME_METRIC_REPO_DATABASE_SCHEMA],
    debug: true,
    // ssl: process.env.BMME_METRIC_REPO_DATABASE_SSL === 'true',
    // debug: process.env.BMME_METRIC_REPO_DATABASE_DEBUG_DEV === 'true',
    pool: {
      min: 2,
      max: 10,
      createTimeoutMillis: 3000,
      acquireTimeoutMillis: 30000,
      idleTimeoutMillis: 30000,
      reapIntervalMillis: 1000,
      createRetryIntervalMillis: 100,
      propagateCreateError: false
    },
  }
};
