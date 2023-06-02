import { IsOptional, IsString, IsBoolean } from 'class-validator';

import { TurnModel } from 'src/domain/models/Turn';

export class UpdateTurnVM {
  @IsOptional()
  @IsString()
  fecha_turno: Date;

  @IsOptional()
  @IsString()
  hora_inicio: Date;

  @IsOptional()
  @IsString()
  hora_fin: Date;

  @IsOptional()
  @IsBoolean()
  estado?: boolean;

  static fromViewModel(vm: UpdateTurnVM): TurnModel {
    return new TurnModel(
      vm.fecha_turno,
      vm.hora_inicio,
      vm.hora_fin,
      vm.estado,
    );
  }
}
