import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    example: 'John Doe',
    description: 'The name of user',
    required: true,
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    example: 'john@email.com',
    required: true,
    description: 'The email address of the user',
  })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({
    example: 'updatepassword',
    description: 'The password of user',
    required: true,
    minLength: 6,
  })
  @IsString()
  @IsOptional()
  password: string;
}
