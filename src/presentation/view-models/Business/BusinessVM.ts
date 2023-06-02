import { Expose, plainToClass } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { BusinessModel } from 'src/domain/models/Business';
import { ServicesModel } from 'src/domain/models/Services';
export class BusinessVM {
  @Expose()
  @ApiProperty()
  id_comercio?: number;

  @Expose()
  @ApiProperty()
  nom_comercio: string;

  @Expose()
  @ApiProperty()
  aforo_maximo: number;

  @Expose()
  @ApiProperty()
  servicios: ServicesModel;

  static toViewModel(business: BusinessModel): BusinessVM {
    return plainToClass(BusinessVM, business, {
      excludeExtraneousValues: true,
    });
  }
}
