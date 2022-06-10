import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Computer Science',
    description: 'The name of book category',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
