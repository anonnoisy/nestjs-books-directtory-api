import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from '@prisma/client';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBookDto: CreateBookDto, userId: number): Promise<Book> {
    return await this.prisma.book.create({
      data: {
        title: createBookDto.title,
        content: createBookDto.content,
        published: createBookDto.published,
        publisherId: createBookDto.publisherId,
        categories: {
          create: [
            {
              assignedBy: userId,
              assignedAt: new Date(),
              categoryId: createBookDto.categoryId,
            },
          ],
        },
        authors: {
          create: [
            {
              assignedBy: userId,
              assignedAt: new Date(),
              authorId: createBookDto.authorId,
            },
          ],
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
      orderBy: {
        id: 'asc',
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

  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    const book = await this.findOne(id);
    return await this.prisma.book.update({
      where: { id: book.id },
      data: {
        title: updateBookDto.title,
        content: updateBookDto.content,
        published: updateBookDto.published,
        publisherId: updateBookDto.publisherId,
        categories: {
          updateMany: {
            where: {
              bookId: book.id,
            },
            data: {
              categoryId: updateBookDto.categoryId,
            },
          },
        },
        authors: {
          updateMany: {
            where: {
              bookId: book.id,
            },
            data: {
              authorId: updateBookDto.authorId,
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
