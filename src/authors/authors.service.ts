import { Injectable, NotFoundException } from '@nestjs/common';
import { Author } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    return await this.prisma.author.create({ data: createAuthorDto });
  }

  async findAll(): Promise<Author[] | []> {
    return await this.prisma.author.findMany();
  }

  async findOne(id: number): Promise<Author> {
    const author = await this.prisma.author.findFirst({ where: { id } });
    if (!author) {
      throw new NotFoundException('Author not found');
    }

    return author;
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto): Promise<Author> {
    const author = await this.findOne(id);

    return await this.prisma.author.update({
      where: { id: author.id },
      data: updateAuthorDto,
    });
  }

  async remove(id: number): Promise<Author> {
    const author = await this.findOne(id);

    return await this.prisma.author.delete({
      where: { id: author.id },
    });
  }
}
