import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { TurnModel } from 'src/domain/models/Turn';

export class TurnVM {
  @Expose()
  @ApiProperty()
  fecha_turno: Date;

  @Expose()
  @ApiProperty()
  hora_inicio: Date;

  @Expose()
  @ApiProperty()
  hora_fin: Date;

  @Expose()
  @ApiProperty()
  estado?: boolean;

  static fromViewModel(vm: TurnVM): TurnModel {
    return new TurnModel(
      vm.fecha_turno,
      vm.hora_inicio,
      vm.hora_fin,
      vm.estado,
    );
  }
}
