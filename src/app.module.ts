import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KnexModule } from 'nestjs-knex';
import { UsersModule } from './users/users.module';
import { LookupModule } from './lookup/lookup.module';

@Module({
  imports: [
    KnexModule.forRoot({
      config: {
        client: 'postgresql',
        version: '5.7',
        useNullAsDefault: true,
        connection: {
          host: 'nest-test.cwbf2u9ksjno.us-east-1.rds.amazonaws.com',
          port: 5432,
          user: 'postgres',
          password: 'Anixter$2020',
          database: 'nest-test',
        },
      },
    }),
    UsersModule,
    LookupModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
