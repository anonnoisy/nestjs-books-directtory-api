import { Module } from '@nestjs/common';
import { PublishersService } from './publishers.service';
import { PublishersController } from './publishers.controller';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [PrismaService],
  controllers: [PublishersController],
  providers: [PublishersService, PrismaService],
})
export class PublishersModule {}
