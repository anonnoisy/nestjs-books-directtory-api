import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from '@prisma/client';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBookDto: CreateBookDto, userId: number): Promise<Book> {
    const categoriesCreation = createBookDto.categoryIds.map((item) => {
      return { assignedBy: userId, assignedAt: new Date(), categoryId: item };
    });

    const authorsCreation = createBookDto.authorIds.map((item) => {
      return { assignedBy: userId, assignedAt: new Date(), authorId: item };
    });

    return await this.prisma.book.create({
      data: {
        title: createBookDto.title,
        content: createBookDto.content,
        published: createBookDto.published,
        publisherId: createBookDto.publisherId,
        categories: {
          create: categoriesCreation,
        },
        authors: {
          create: authorsCreation,
        },
      },
      include: {
        publisher: true,
        authors: {
          select: {
            author: true,
          },
        },
        categories: {
          select: {
            category: true,
          },
        },
      },
    });
  }

  async findAll(): Promise<Book[]> {
    return await this.prisma.book.findMany({
      include: {
        publisher: true,
        authors: {
          select: {
            author: true,
          },
        },
        categories: {
          select: {
            category: true,
          },
        },
      },
      orderBy: {
        id: 'asc',
      },
    });
  }

  async findOne(id: number): Promise<Book> {
    const book = await this.prisma.book.findFirst({
      where: { id },
      include: {
        publisher: true,
        authors: {
          select: {
            author: true,
          },
        },
        categories: {
          select: {
            category: true,
          },
        },
      },
    });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return book;
  }

  async update(
    id: number,
    userId: number,
    updateBookDto: UpdateBookDto,
  ): Promise<Book> {
    const book = await this.findOne(id);

    const categoriesCreation = updateBookDto.categoryIds.map((item) => {
      return {
        categoryId: item,
        assignedBy: userId,
        assignedAt: new Date(),
      };
    });

    const authorsCreation = updateBookDto.authorIds.map((item) => {
      return {
        authorId: item,
        assignedBy: userId,
        assignedAt: new Date(),
      };
    });

    return await this.prisma.book.update({
      where: { id: book.id },
      data: {
        title: updateBookDto.title,
        content: updateBookDto.content,
        published: updateBookDto.published,
        publisherId: updateBookDto.publisherId,
        categories: {
          deleteMany: {},
          createMany: {
            data: categoriesCreation,
          },
        },
        authors: {
          deleteMany: {},
          createMany: {
            data: authorsCreation,
          },
        },
      },
      include: {
        publisher: true,
        authors: {
          select: {
            author: true,
          },
        },
        categories: {
          select: {
            category: true,
          },
        },
      },
    });
  }

  async remove(id: number): Promise<Book> {
    const book = await this.findOne(id);

    // Delete the book relationship first
    await this.prisma.book.update({
      where: { id: book.id },
      data: {
        authors: {
          deleteMany: {},
        },
        categories: {
          deleteMany: {},
        },
      },
      include: {
        authors: true,
        categories: true,
      },
    });

    return this.prisma.book.delete({
      where: { id: book.id },
    });
  }
}
