import { IsOptional, IsString, IsBoolean } from 'class-validator';

import { TurnModel } from 'src/domain/models/Turn';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTurnVM {
  @IsOptional()
  @IsString()
  @ApiProperty()
  fecha_turno: Date;

  @IsOptional()
  @IsString()
  @ApiProperty()
  hora_inicio: Date;

  @IsOptional()
  @IsString()
  @ApiProperty()
  hora_fin: Date;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
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
