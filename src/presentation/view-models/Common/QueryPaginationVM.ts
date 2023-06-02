import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class QueryPaginationVM {
  @IsOptional()
  @ApiProperty({
    required: false,
    example: 10,
  })
  take?: number;

  @IsOptional()
  @ApiProperty({
    required: false,
  })
  keyword?: string;

  @IsOptional()
  @ApiProperty({
    required: false,
    example: 1,
  })
  page?: number;
}
