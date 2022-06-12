import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
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
    example: [1, 2, 3],
    description: 'Ids category of the book',
    required: true,
  })
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  categoryIds: number[];

  @ApiProperty({
    example: [1, 2, 3],
    description: 'Ids author of the book',
    required: true,
  })
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  authorIds: number[];

  @ApiProperty({
    example: 1,
    description: 'Publisher of the book',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  publisherId: number;
}
