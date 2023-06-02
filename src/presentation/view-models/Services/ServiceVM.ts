import { Expose, plainToClass } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ServicesModel } from 'src/domain/models/Services';
import { BusinessModel } from 'src/domain/models/Business';

export class ServiceVM {
  @Expose()
  @ApiProperty()
  nom_servicio: string;

  @Expose()
  @ApiProperty()
  hora_apertura: Date;

  @Expose()
  @ApiProperty()
  hora_cierre: Date;

  @Expose()
  @ApiProperty()
  duracion: number;

  @Expose()
  @ApiProperty()
  id_comercio: BusinessModel;

  static toViewModel(service: ServicesModel): ServiceVM {
    return plainToClass(ServiceVM, service, { excludeExtraneousValues: true });
  }
}
