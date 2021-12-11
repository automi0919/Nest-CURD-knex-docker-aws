import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
// import Knex from 'knex';
import { InjectKnex, Knex as K } from 'nestjs-knex';
import { CreateLookupDto } from './dto/create-lookup.dto';
import { GetLookupDto } from './dto/get-lookup.dto';
import { UpdateLookupDto } from './dto/update-lookup.dto';
import { getDatabaseConnector } from './../db/db-injector';
import dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class LookupService {
  constructor(@InjectKnex() private readonly knex: K) {}

  /*
   * CREATE function
   */
  async create(createLookupDto: CreateLookupDto) {
    console.log('Create: ', createLookupDto);
    try {
      const data = await getDatabaseConnector().then(conn => { return conn.table('lookup').insert(createLookupDto)});

      return { data, statusCode: 200 };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  /*
   * FIND ALL function
   */
  async findAll() {
    try {
      const data = await getDatabaseConnector().then(conn => {return conn.table('lookup').distinct('type')});
      return { data, statusCode: 200 };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  /*
   * FIND function
   */
  async findOne(type: string, reqParam: GetLookupDto) {
    let data: any;
    if (!type) {
      throw new NotFoundException(`Type ${type} does not exist`);
    }
    if (reqParam.audit === 'true') {
      try {
      data = await getDatabaseConnector().then(conn => {return conn.table('lookup')
          .where({ type: type })
          .andWhere('key', 'like', reqParam.key)
          .orderBy([{ column: 'sort_order', order: reqParam.sortOrder }]) });

        return { data, statusCode: 200 };
      } catch (err) {
        throw new HttpException(err, HttpStatus.BAD_REQUEST);
      }
    } else {
      try {
      data =await getDatabaseConnector().then(conn => {return conn.table('lookup')
          .where({ type: type })
          .andWhere('key', 'like', reqParam.key)
          .orderBy([{ column: 'sort_order', order: reqParam.sortOrder }])
          .select('id', 'type', 'key', 'value', 'is_active')});

        return { data, statusCode: 200 };
      } catch (err) {
        throw new HttpException(err, HttpStatus.BAD_REQUEST);
      }
    }
  }

  /*
   * FULLUPDATE function
   */
  async fullUpdate(id: number, user: string, updateLookupDto: UpdateLookupDto) {
    if (!id) {
      throw new NotFoundException(`Id ${id} does not exist`);
    }
    try {
      const data = await getDatabaseConnector().then(conn => {return conn.table('lookup')
        .where({ id: id })
        .update({ type: updateLookupDto.type })
        .update({ key: updateLookupDto.key })
        .update({ value: updateLookupDto.value })
        .update({ is_active: updateLookupDto.is_active })
        .update({ updated_by: user })
        .update({ updated_on: 'now' })});

      return { data, statusCode: 200 };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  /*
   * UPDATE function
   */
  async update(id: number, user: string, updateLookupDto: UpdateLookupDto) {
    if (!id) {
      throw new NotFoundException(`Id ${id} does not exist`);
    }
    try {
      const data = await getDatabaseConnector().then(conn => {return conn.table('lookup')
      .where({ id: id })
      .update(updateLookupDto)
      .update({ updated_by: user })
      .update({ updated_on: 'now' })
    })
       

      return { data, statusCode: 200 };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  /*
   * REMOVE function
   */
  async remove(id: number) {
    if (!id) {
      throw new NotFoundException(`Id ${id} does not exist`);
    }
    const data = await getDatabaseConnector().then(conn => { return conn.table('lookup').where({ id: id }).del() });
  }
}

