import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class QuizzesQueryParams {
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  readonly page: number = 1;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  readonly pageSize: number = 10;
}
