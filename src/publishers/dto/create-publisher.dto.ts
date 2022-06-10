import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePublisherDto {
  @ApiProperty({
    example: 'Mark Zuckerberg',
    description: 'The author name of book',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
