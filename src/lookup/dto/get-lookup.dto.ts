import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetLookupDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  key = '%';

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  sortOrder = 'asc';

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  audit = 'false';
}
