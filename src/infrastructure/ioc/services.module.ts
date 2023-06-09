import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicesController } from 'src/presentation/controllers/services.controller';

import { CommonService } from 'src/domain/services/CommonService';

import { ServiceUseCases } from 'src/application/use-cases/ServiceUseCase';
import { BusinessUseCases } from 'src/application/use-cases/BusinessUseCase';

import { Servicios } from '../database/mapper/Services.entity';
import { Comercios } from '../database/mapper/Business.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Servicios]),
    TypeOrmModule.forFeature([Comercios]),
  ],
  controllers: [ServicesController],
  providers: [ServiceUseCases, BusinessUseCases, CommonService],
})
export class ServicesModule {}
