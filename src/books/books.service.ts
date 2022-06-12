import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from '@prisma/client';
import { QuerySearchBookDto } from './dto/query-search-book.dto';

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

  async findAll(querySearchBookDto: QuerySearchBookDto): Promise<Book[]> {
    return await this.prisma.book.findMany({
      where: {
        title: { contains: querySearchBookDto.title },
        publisher: {
          name: { contains: querySearchBookDto.publisher },
        },
        published: querySearchBookDto.published === 'true',
        authors: {
          some: {
            author: {
              name: { contains: querySearchBookDto.author },
            },
          },
        },
        categories: {
          some: {
            category: {
              name: { contains: querySearchBookDto.category },
            },
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

  async changePublished(id: number, isPublished: boolean): Promise<Book> {
    return await this.prisma.book.update({
      where: { id },
      data: {
        published: isPublished,
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
