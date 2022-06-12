import { Expose } from 'class-transformer';

export class AuthDto {
  @Expose()
  id: number;

  @Expose()
  name: number;

  @Expose()
  email: number;
}
