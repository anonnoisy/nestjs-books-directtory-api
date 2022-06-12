import { IsBoolean } from 'class-validator';

export class ChangePublishedDto {
  @IsBoolean()
  published: boolean;
}
