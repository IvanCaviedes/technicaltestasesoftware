import { IsOptional, IsNotEmpty, IsString, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TurnModel } from 'src/domain/models/Turn';

export class CreateTurnVM {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  fecha_turno: Date;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  hora_inicio: Date;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  hora_fin: Date;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
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
