import Knex from 'knex';
import dotenv from 'dotenv';
dotenv.config();

import * as dbConfig from '../../knexfile';
import * as AWS from 'aws-sdk';
import * as fs from 'fs';
import { Client } from 'pg';


let cachedConnection;

const dbIAMAuthenticate = async (region, hostname, port, username) => {
  try {
    const signerObj = new AWS.RDS.Signer({
      // Using the Credential injected by IAM Role of the Lambda in Runtime
      credentials: new AWS.Credentials(
        process.env.AWS_ACCESS_KEY_ID,
        process.env.AWS_SECRET_ACCESS_KEY,
        process.env.AWS_SESSION_TOKEN,
      ),
      region: region,
      hostname: hostname,
      port: parseInt(port),
      username: username,
    });
    // Using a signer (AWS.RDS.Signer) object to generate an auth token to a database
    return await signerObj.getAuthToken({});
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getClient = async (
  database,
  username,
  host,
  port,
  region,
) => {
  const dbAuthToken = await dbIAMAuthenticate(
    region,
    host,
    parseInt(port),
    username,
  ).then(token => {return token});
  const certFile =  process.cwd() + '/src/certs/rds-combined-ca-bundle.pem'

  console.log("dbAuthToken: ", dbAuthToken)

  return new Client({
    user: username,
    host: host,
    database: database,
    password: dbAuthToken,
    port: parseInt(port),
    ssl: {
      rejectUnauthorized: false,
      ca: fs.readFileSync(certFile).toString(),
    },
  });
};

export const getDatabaseConnector = async () => {
  let configByEnvironment: any;
  
  configByEnvironment = dbConfig[process.env.NODE_ENV];
  

  if (!configByEnvironment) {
    throw new Error(
      `Failed to get knex configuration for env:${process.env.NODE_ENV}`,
    );
  }

  

  configByEnvironment.connection.password = await dbIAMAuthenticate(
    "us-east-1",
    configByEnvironment.connection.host,
    configByEnvironment.connection.port,
    configByEnvironment.connection.user
  ).then(token => {console.log('this is the token generated'); return token});

  const certFile =  process.cwd() + '/src/certs/rds-combined-ca-bundle.pem'
  configByEnvironment.connection.ssl = {
    rejectUnauthorized: false,
    ca: fs.readFileSync(certFile).toString(),
  }

  console.log("connection: check here ", configByEnvironment.connection)
  console.log('New Connection');
  const connection = Knex(configByEnvironment);
  cachedConnection = connection;
  return connection;
};
