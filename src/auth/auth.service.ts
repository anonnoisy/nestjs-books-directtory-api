import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { randomBytes, scrypt } from 'crypto';
import { UsersService } from 'src/users/users.service';
import { promisify } from 'util';
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

    // Hash the user password
    const salt = randomBytes(8).toString('hex');
    const hash = (await promisify(scrypt)(
      signUpDto.password,
      salt,
      32,
    )) as Buffer;
    const result = salt + '.' + hash.toString('hex');

    signUpDto.password = result;

    return await this.usersService.create(signUpDto);
  }

  // To sign in a user
  async validateUser(signInDto: SignInDto) {
    const [user] = await this.usersService.findAll(signInDto.email);
    if (!user) {
      throw new BadRequestException('Invalid user credentials');
    }

    const [salt, storedHash] = user.password.split('.');
    const hash = (await promisify(scrypt)(
      signInDto.password,
      salt,
      32,
    )) as Buffer;

    if (storedHash !== hash.toString('hex')) {
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
}
