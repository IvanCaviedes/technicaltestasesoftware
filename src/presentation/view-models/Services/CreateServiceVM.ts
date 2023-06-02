import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { ServicesModel } from 'src/domain/models/Services';
import { TimeHourFormat } from '../CustomValidations/';

export class CreateServiceVM {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  nom_servicio: string;

  @IsNotEmpty()
  @TimeHourFormat()
  @ApiProperty({
    example: '00:00',
  })
  hora_apertura: Date;

  @IsNotEmpty()
  @TimeHourFormat()
  @ApiProperty({
    example: '00:00',
  })
  hora_cierre: Date;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  duracion: number;

  static fromViewModel(vm: CreateServiceVM): ServicesModel {
    return new ServicesModel(
      vm.nom_servicio,
      vm.hora_apertura,
      vm.hora_cierre,
      vm.duracion,
    );
  }
}
