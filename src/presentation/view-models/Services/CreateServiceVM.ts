import {
  IsString,
  IsOptional,
  IsNumber,
  IsNotEmpty,
  IsDate,
} from 'class-validator';

import { ServicesModel } from 'src/domain/models/Services';

export class CreateServiceVM {
  @IsOptional()
  @IsNumber()
  id_servicio?: number;

  @IsNotEmpty()
  @IsString()
  nom_servicio: string;

  @IsNotEmpty()
  @IsString()
  hora_apertura: Date;

  @IsNotEmpty()
  @IsString()
  hora_cierre: Date;

  @IsNotEmpty()
  @IsNumber()
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
