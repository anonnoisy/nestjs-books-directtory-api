import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { decryption } from 'src/helpers/hash.helper';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from './dtos/sign-in.dto';
import { SignUpDto } from './dtos/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // To create a new user account
  async registerUser(signUpDto: SignUpDto) {
    const users = await this.usersService.findAll(signUpDto.email);
    if (users.length > 0) {
      throw new BadRequestException('Email is already in use');
    }

    // the password will be encrypted on user creation
    return await this.usersService.create(signUpDto);
  }

  // To sign in a user
  async validateUser(signInDto: SignInDto) {
    const [user] = await this.usersService.findAll(signInDto.email);
    if (!user) {
      throw new BadRequestException('Invalid user credentials');
    }

    const isValidCredentials = await decryption(
      signInDto.password,
      user.password,
    );

    if (!isValidCredentials) {
      throw new BadRequestException('Invalid user credentials');
    }

    return user;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async profile(id: number) {
    return await this.usersService.findOne(id);
  }
}
