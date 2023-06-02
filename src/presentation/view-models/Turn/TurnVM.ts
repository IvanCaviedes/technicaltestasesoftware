import { Expose, plainToClass } from 'class-transformer';
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

  static toViewModel(service: TurnModel): TurnVM {
    return plainToClass(TurnVM, service, { excludeExtraneousValues: true });
  }
}
