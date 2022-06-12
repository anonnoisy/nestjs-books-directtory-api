import { Module } from '@nestjs/common';
import { PublishersService } from './publishers.service';
import { PublishersController } from './publishers.controller';
import { PrismaService } from '../prisma.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [PrismaService, UsersModule],
  controllers: [PublishersController],
  providers: [PublishersService, PrismaService],
})
export class PublishersModule {}
