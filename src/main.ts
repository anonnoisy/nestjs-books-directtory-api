import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AuthModule } from './auth/auth.module';
import { AuthorsModule } from './authors/authors.module';
import { BooksModule } from './books/books.module';
import { CategoriesModule } from './categories/categories.module';
import { PublishersModule } from './publishers/publishers.module';
import { UsersModule } from './users/users.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: true,
    }),
  );

  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
  });

  const options = new DocumentBuilder()
    .setTitle('Authentication API Endpoints')
    .setDescription('The authentication API description')
    .setVersion('1.0')
    .build();

  const catDocument = SwaggerModule.createDocument(app, options, {
    include: [AuthModule],
  });
  SwaggerModule.setup('api/auth', app, catDocument);

  const secondOptions = new DocumentBuilder()
    .setTitle('Users API Endpoints')
    .setDescription('The users API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const userDocument = SwaggerModule.createDocument(app, secondOptions, {
    include: [UsersModule],
  });
  SwaggerModule.setup('api/users', app, userDocument);

  const thirdOptions = new DocumentBuilder()
    .setTitle('Books Directory API Endpoints')
    .setDescription('The Books directory API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const bookDocument = SwaggerModule.createDocument(app, thirdOptions, {
    include: [AuthorsModule, CategoriesModule, PublishersModule, BooksModule],
  });
  SwaggerModule.setup('api/books', app, bookDocument);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
