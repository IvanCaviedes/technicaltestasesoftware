import { IsString, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BusinessModel } from 'src/domain/models/Business';

export class UpdateBusinessVM {
  @IsOptional()
  @IsNumber()
  @ApiProperty()
  id_comercio?: number;

  @IsOptional()
  @IsString()
  @ApiProperty()
  nom_comercio: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  aforo_maximo: number;

  static fromViewModel(vm: UpdateBusinessVM): BusinessModel {
    return new BusinessModel(vm.nom_comercio, vm.aforo_maximo);
  }
}
