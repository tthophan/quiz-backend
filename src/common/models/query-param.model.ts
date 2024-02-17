import { Transform } from 'class-transformer'
import { IsNumber, IsOptional } from 'class-validator'

export class QueryParams {
  @IsNumber()
  @Transform(({ value }) => Number(value))
  page: number

  @IsNumber()
  @Transform(({ value }) => Number(value))
  pageSize: number

  @IsOptional()
  orderBy?: { [key: string]: 'asc' | 'desc' }
}
