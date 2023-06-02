import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { DateFormatTimestamp } from '../CustomValidations/DateValidator';

export class ParamsAutoGenerateTurnVM {
  @IsNotEmpty()
  @DateFormatTimestamp()
  @ApiProperty({
    example: 'dd/mm/yyyy',
  })
  fecha_inicio: Date;

  @IsNotEmpty()
  @DateFormatTimestamp()
  @ApiProperty({
    example: 'dd/mm/yyyy',
  })
  fecha_fin: Date;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  id_Service: number;
}
