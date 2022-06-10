import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [PrismaService],
  controllers: [BooksController],
  providers: [PrismaService, BooksService],
})
export class BooksModule {}
