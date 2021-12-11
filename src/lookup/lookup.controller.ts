import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HostParam,
  Query,
  UsePipes,
  ValidationPipe,
  Put,
} from '@nestjs/common';
import { LookupService } from './lookup.service';
import { CreateLookupDto } from './dto/create-lookup.dto';
import { UpdateLookupDto } from './dto/update-lookup.dto';
import { GetLookupDto } from './dto/get-lookup.dto';

@Controller('/api/v1/lookup')
export class LookupController {
  constructor(private readonly lookupService: LookupService) {}

  /*
   * POST Method with query parameters
   * ValidationPipe transform is used to validate the input and link to the DTO with default values
   * enableImplicitConversion: true is used to convert strings to numbers based on TO. Booleans do not work
   */
  @Post()
  @UsePipes(
    new ValidationPipe({
      transform: true,
    }),
  )
  create(@Body() createLookupDto: CreateLookupDto) {
    return this.lookupService.create(createLookupDto);
  }

  /*
   * GET Method
   */
  @Get()
  findAll() {
    return this.lookupService.findAll();
  }

  /*
   * GET Method with query parameters
   * ValidationPipe transform is used to validate the input and link to the DTO with default values
   * enableImplicitConversion: true is used to convert strings to numbers based on TO. Booleans do not work
   */
  @Get(':type')
  @UsePipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  )
  async findOne(@Param('type') type: string, @Query() reqParam: GetLookupDto) {
    return this.lookupService.findOne(type, reqParam);
  }

  /*
   * PUT Method
   */
  @Put(':id/:user')
  @UsePipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  )
  fullUpdate(
    @Param('id') id: string,
    @Param('user') user: string,
    @Body() updateLookupDto: UpdateLookupDto,
  ) {
    return this.lookupService.fullUpdate(+id, user, updateLookupDto);
  }

  /*
   * PATCH Method
   */
  @Patch(':id/:user')
  @UsePipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  )
  update(
    @Param('id') id: string,
    @Param('user') user: string,
    @Body() updateLookupDto: UpdateLookupDto,
  ) {
    return this.lookupService.update(+id, user, updateLookupDto);
  }

  /*
   * DELETE Method
   */
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.lookupService.remove(id);
  }
}
