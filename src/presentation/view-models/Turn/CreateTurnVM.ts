import { IsOptional, IsNotEmpty, IsString, IsBoolean } from 'class-validator';

import { TurnModel } from 'src/domain/models/Turn';

export class CreateTurnVM {
  @IsNotEmpty()
  @IsString()
  fecha_turno: Date;

  @IsNotEmpty()
  @IsString()
  hora_inicio: Date;

  @IsNotEmpty()
  @IsString()
  hora_fin: Date;

  @IsOptional()
  @IsBoolean()
  estado?: boolean;

  static fromViewModel(vm: CreateTurnVM): TurnModel {
    return new TurnModel(
      vm.fecha_turno,
      vm.hora_inicio,
      vm.hora_fin,
      vm.estado,
    );
  }
}
