import { IsString, IsOptional, IsNumber } from 'class-validator';

import { BusinessModel } from 'src/domain/models/Business';

export class UpdateBusinessVM {
  @IsOptional()
  @IsNumber()
  id_comercio?: number;

  @IsOptional()
  @IsString()
  nom_comercio: string;

  @IsOptional()
  @IsNumber()
  aforo_maximo: number;

  static fromViewModel(vm: UpdateBusinessVM): BusinessModel {
    return new BusinessModel(vm.nom_comercio, vm.aforo_maximo);
  }
}
