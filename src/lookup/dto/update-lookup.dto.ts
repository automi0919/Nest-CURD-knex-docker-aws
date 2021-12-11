import { PartialType } from '@nestjs/mapped-types';
import { CreateLookupDto } from './create-lookup.dto';

export class UpdateLookupDto extends PartialType(CreateLookupDto) {}
