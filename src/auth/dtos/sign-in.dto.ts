import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    example: 'doe@email.com',
    required: true,
    description: 'The email address was registerd',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'password',
    required: true,
    description: 'The password was registerd',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
