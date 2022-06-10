import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBookDto {
  @ApiProperty({
    example: 'Calm',
    description: 'The title of book',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'Rileks, Fokus, dan Ubahlah Duniamu',
    description: 'Short description of book',
    required: true,
  })
  @IsString()
  @IsOptional()
  content: string;

  @ApiProperty({
    example: true,
    description: 'Is book was published?',
    required: true,
  })
  @IsBoolean()
  @IsOptional()
  published: boolean;

  @ApiProperty({
    example: 1,
    description: 'Category of the book',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

  @ApiProperty({
    example: 1,
    description: 'Author of the book',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  authorId: number;

  @ApiProperty({
    example: 1,
    description: 'Publisher of the book',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  publisherId: number;
}
