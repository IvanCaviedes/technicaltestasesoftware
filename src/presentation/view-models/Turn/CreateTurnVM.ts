import { IsOptional, IsNotEmpty, IsString, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TurnModel } from 'src/domain/models/Turn';
import { DateFormatTimestamp, TimeHourFormat } from '../CustomValidations';

export class CreateTurnVM {
  @IsNotEmpty()
  @DateFormatTimestamp()
  @ApiProperty({
    example: 'dd/mm/yyyy',
  })
  fecha_turno: Date;

  @IsNotEmpty()
  @TimeHourFormat()
  @ApiProperty({
    example: '00:00',
  })
  hora_inicio: Date;

  @IsNotEmpty()
  @TimeHourFormat()
  @ApiProperty({
    example: '00:00',
  })
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
