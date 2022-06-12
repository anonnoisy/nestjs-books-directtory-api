import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AuthService } from './auth.service';
import { AuthDto } from './dtos/auth.dto';
import { SignInDto } from './dtos/sign-in.dto';
import { SignUpDto } from './dtos/sign-up.dto';

@ApiTags('Authentication')
@Serialize(AuthDto)
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @ApiResponse({
    status: 201,
    description: 'Registration successful.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid credentials.',
  })
  async signup(@Body() signUpDto: SignUpDto) {
    return this.authService.registerUser(signUpDto);
  }

  @Post('/signin')
  @ApiResponse({
    status: 200,
    description: 'Authentication successful.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid credentials.',
  })
  async signin(@Body() signInDto: SignInDto) {
    const user = await this.authService.validateUser(signInDto);

    return await this.authService.login(user);
  }

  // For now the jwt token is NOT SECURE, because the token can be revoked
  @UseGuards(JwtAuthGuard)
  @Post('/logout')
  @ApiResponse({
    status: 200,
    description: 'Logout successful.',
  })
  async logout(@Req() request) {
    return null;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  @ApiResponse({
    status: 200,
    description: 'Get user profile successful.',
  })
  async profile(@Req() request) {
    return await this.authService.profile(+request.user.userId);
  }
}
