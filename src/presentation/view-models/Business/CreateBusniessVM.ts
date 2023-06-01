import { IsString, IsOptional, IsNumber, IsNotEmpty } from 'class-validator';

import { BusinessModel } from 'src/domain/models/Business';

export class CreateBusinessVM {
  @IsOptional()
  @IsNumber()
  id_comercio?: number;

  @IsNotEmpty()
  @IsString()
  nom_comercio: string;

  @IsNotEmpty()
  @IsNumber()
  aforo_maximo: number;

  static fromViewModel(vm: CreateBusinessVM): BusinessModel {
    return new BusinessModel(vm.nom_comercio, vm.aforo_maximo);
  }
}
