import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './src/app.module';
import express from 'express';
import { Express } from 'express';
import { Server } from 'http';
import { Context } from 'aws-lambda';
import { createServer, proxy, Response } from 'aws-serverless-express';
// import * as morgan from 'morgan';

export async function createApp(
  expressApp: Express,
): Promise<INestApplication> {

  return await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
    {
      logger: ['verbose']
    });

}

let cachedServer: Server;

async function bootstrap(): Promise<Server> {
  const expressApp = express();

  const app = await createApp(expressApp);
  // app.use(morgan('tiny'));
  await app.init();
  app.enableCors();

  return createServer(expressApp);
}

export async function handler(event: any, context: Context): Promise<Response> {
  if (!cachedServer) {
    cachedServer = await bootstrap();
  }

  return proxy(cachedServer, event, context, 'PROMISE').promise;
}
