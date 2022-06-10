import { Injectable, NotFoundException } from '@nestjs/common';
import { Publisher } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { UpdatePublisherDto } from './dto/update-publisher.dto';

@Injectable()
export class PublishersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPublisherDto: CreatePublisherDto): Promise<Publisher> {
    return await this.prisma.publisher.create({ data: createPublisherDto });
  }

  async findAll(): Promise<Publisher[] | []> {
    return await this.prisma.publisher.findMany();
  }

  async findOne(id: number): Promise<Publisher> {
    const publisher = await this.prisma.publisher.findFirst({ where: { id } });
    if (!publisher) {
      throw new NotFoundException('Publisher not found');
    }

    return publisher;
  }

  async update(
    id: number,
    updatePublisherDto: UpdatePublisherDto,
  ): Promise<Publisher> {
    const publisher = await this.findOne(id);

    return await this.prisma.publisher.update({
      where: { id: publisher.id },
      data: updatePublisherDto,
    });
  }

  async remove(id: number): Promise<Publisher> {
    const publisher = await this.findOne(id);

    return await this.prisma.publisher.delete({
      where: { id: publisher.id },
    });
  }
}
