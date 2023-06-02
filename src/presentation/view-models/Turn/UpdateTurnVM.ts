import { IsOptional, IsBoolean } from 'class-validator';

import { TurnModel } from 'src/domain/models/Turn';
import { ApiProperty } from '@nestjs/swagger';
import { TimeHourFormat, DateFormatTimestamp } from '../CustomValidations';

export class UpdateTurnVM {
  @IsOptional()
  @DateFormatTimestamp()
  @ApiProperty({
    example: 'dd/mm/yyyy',
  })
  fecha_turno: Date;

  @IsOptional()
  @TimeHourFormat()
  @ApiProperty({
    example: '00:00',
  })
  hora_inicio: Date;

  @IsOptional()
  @TimeHourFormat()
  @ApiProperty({
    example: '00:00',
  })
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
