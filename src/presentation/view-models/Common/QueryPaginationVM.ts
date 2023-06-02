import { IsOptional } from 'class-validator';
export class QueryPaginationVM {
  @IsOptional()
  take?: number;
  @IsOptional()
  skip?: string;
  @IsOptional()
  keyword?: string;
  @IsOptional()
  page?: number;
}
