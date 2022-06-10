import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return await this.prisma.category.create({ data: createCategoryDto });
  }

  async findAll(): Promise<Category[] | []> {
    return await this.prisma.category.findMany();
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.prisma.category.findFirst({ where: { id } });
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.findOne(id);

    return await this.prisma.category.update({
      where: { id: category.id },
      data: updateCategoryDto,
    });
  }

  async remove(id: number): Promise<Category> {
    const category = await this.findOne(id);

    return await this.prisma.category.delete({
      where: { id: category.id },
    });
  }
}
