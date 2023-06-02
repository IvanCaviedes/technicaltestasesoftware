import { IsString, IsOptional, IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BusinessModel } from 'src/domain/models/Business';

export class CreateBusinessVM {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  nom_comercio: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  aforo_maximo: number;

  static fromViewModel(vm: CreateBusinessVM): BusinessModel {
    return new BusinessModel(vm.nom_comercio, vm.aforo_maximo);
  }
}
