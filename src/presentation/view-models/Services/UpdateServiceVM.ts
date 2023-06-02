import { IsString, IsOptional, IsNumber } from 'class-validator';

import { ServicesModel } from 'src/domain/models/Services';
import { ApiProperty } from '@nestjs/swagger';
import { TimeHourFormat } from '../CustomValidations/';
export class UpdateServiceVM {
  @IsOptional()
  @IsString()
  @ApiProperty()
  nom_servicio: string;

  @IsOptional()
  @TimeHourFormat()
  @ApiProperty({
    example: '00:00',
  })
  hora_apertura: Date;

  @IsOptional()
  @TimeHourFormat()
  @ApiProperty({
    example: '00:00',
  })
  hora_cierre: Date;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  duracion: number;

  @IsOptional()
  @IsNumber()
  id_comercio: number;

  static fromViewModel(vm: UpdateServiceVM): ServicesModel {
    return new ServicesModel(
      vm.nom_servicio,
      vm.hora_apertura,
      vm.hora_cierre,
      vm.duracion,
      vm.id_comercio,
    );
  }
}
