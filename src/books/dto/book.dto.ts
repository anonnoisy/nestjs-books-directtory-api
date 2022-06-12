import { Expose, Transform } from 'class-transformer';

export class BookDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  content: number;

  @Expose()
  published: boolean;

  @Expose()
  publisher: object;

  @Transform(({ value }) => {
    return value.map((item) => item.author);
  })
  @Expose()
  authors: Array<object>;

  @Transform(({ value }) => {
    return value.map((item) => item.category);
  })
  @Expose()
  categories: Array<object>;
}
