import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TurnController } from 'src/presentation/controllers/turn.controller';

import { CommonService } from 'src/domain/services/CommonService';

import { ServiceUseCases } from 'src/application/use-cases/ServiceUseCase';
import { BusinessUseCases } from 'src/application/use-cases/BusinessUseCase';
import { TurnUseCases } from 'src/application/use-cases/TurnUseCase';

import { Servicios } from '../database/mapper/Services.entity';
import { Comercios } from '../database/mapper/Business.entity';
import { Turnos } from '../database/mapper/Turn.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Servicios]),
    TypeOrmModule.forFeature([Comercios]),
    TypeOrmModule.forFeature([Turnos]),
  ],
  controllers: [TurnController],
  providers: [TurnUseCases, ServiceUseCases, BusinessUseCases, CommonService],
})
export class TurnModule {}
