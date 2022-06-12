import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { PrismaService } from '../prisma.service';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [PrismaService, UsersModule],
  controllers: [BooksController],
  providers: [PrismaService, BooksService],
})
export class BooksModule {}
