import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateLookupDto {
  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  key: string;

  @IsNotEmpty()
  @IsString()
  value: string;

  @IsNotEmpty()
  @IsNumber()
  sort_order: number;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  is_active = true;

  @IsNotEmpty()
  @IsString()
  created_by: string;

  @IsOptional()
  @IsString()
  updated_by: string;
}
