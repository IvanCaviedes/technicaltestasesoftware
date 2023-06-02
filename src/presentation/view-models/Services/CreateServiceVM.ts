import { IsString, IsOptional, IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { ServicesModel } from 'src/domain/models/Services';

export class CreateServiceVM {
  @IsOptional()
  @IsNumber()
  @ApiProperty()
  id_servicio?: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  nom_servicio: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  hora_apertura: Date;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
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
