import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectKnex, Knex as K } from 'nestjs-knex';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { getDatabaseConnector } from './../db/db-injector';
import dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class UsersService {
  constructor( @InjectKnex() private readonly knex: K  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const data = await getDatabaseConnector().then(conn => { return conn.table('nestusers').insert({
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        email: createUserDto.email,
      })});

      return { data };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    const data = await getDatabaseConnector().then(conn => { return conn.table('nestusers')});
    return { data };
  }

  async findOne(id: number) {
    if (!id) {
      throw new NotFoundException(`User ${id} does not exist`);
    }
    const data = await getDatabaseConnector().then(conn => { return conn.table('nestusers').where('id', id)});
    return { data };
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const data = await getDatabaseConnector().then(conn => { return conn.table('nestusers').where('id', id).update({
        firstName: updateUserDto.firstName,
        lastName: updateUserDto.lastName,
      })});

      return { data };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    if (!id) {
      throw new NotFoundException(`User ${id} does not exist`);
    }
    const data = await getDatabaseConnector().then(conn => { return conn.table('nestusers').where('id', id).del();})
    return { data };
  }
}
