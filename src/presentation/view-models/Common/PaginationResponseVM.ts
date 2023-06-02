import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationResponseVM<Entity> {
  @Expose()
  @ApiProperty()
  statusCode: string;

  @Expose()
  @ApiProperty()
  data: Entity[];

  @Expose()
  @ApiProperty()
  count: number;

  @Expose()
  @ApiProperty()
  currentPage: number | null;

  @Expose()
  @ApiProperty()
  nextPage: number | null;

  @Expose()
  @ApiProperty()
  prevPage: number | null;

  @Expose()
  @ApiProperty()
  lastPage: number;
}
