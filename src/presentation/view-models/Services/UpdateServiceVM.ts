import { IsString, IsOptional, IsNumber } from 'class-validator';

import { ServicesModel } from 'src/domain/models/Services';

export class UpdateServiceVM {
  @IsOptional()
  @IsNumber()
  id_servicio?: number;

  @IsOptional()
  @IsString()
  nom_servicio: string;

  @IsOptional()
  @IsString()
  hora_apertura: Date;

  @IsOptional()
  @IsString()
  hora_cierre: Date;

  @IsOptional()
  @IsNumber()
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
