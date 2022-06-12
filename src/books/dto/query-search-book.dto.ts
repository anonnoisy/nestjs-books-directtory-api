import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class QuerySearchBookDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  category: string;

  @IsString()
  @IsOptional()
  author: string;

  @IsString()
  @IsOptional()
  publisher: string;

  @IsString()
  @IsOptional()
  published: string;
}
