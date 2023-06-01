import { Expose } from 'class-transformer';

export class PaginationResponseVM<Entity> {
  @Expose()
  statusCode: string;

  @Expose()
  data: Entity[];

  @Expose()
  count: number;

  @Expose()
  currentPage: number | null;

  @Expose()
  nextPage: number | null;

  @Expose()
  prevPage: number | null;

  @Expose()
  lastPage: number;
}
