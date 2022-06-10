import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AuthService } from './auth.service';
import { SignInDto } from './dtos/sign-in.dto';
import { SignUpDto } from './dtos/sign-up.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @ApiResponse({
    status: 201,
    description: 'Registration successful.',
  })
  async signup(@Body() signUpDto: SignUpDto) {
    return this.authService.registerUser(signUpDto);
  }

  @Post('/signin')
  @ApiResponse({
    status: 200,
    description: 'Authentication successful.',
  })
  async signin(@Body() signInDto: SignInDto) {
    const user = await this.authService.validateUser(signInDto);

    return await this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/logout')
  @ApiResponse({
    status: 200,
    description: 'Logout successful.',
  })
  async logout(@Req() request) {
    console.log(request.isAuthenticated());
    return request.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  @ApiResponse({
    status: 200,
    description: 'Get user profile successful.',
  })
  async profile(@Req() request) {
    return request.user;
  }
}
