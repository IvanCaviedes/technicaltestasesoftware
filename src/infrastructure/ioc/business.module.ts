import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessController } from 'src/presentation/controllers/business.controller';

import { CommonService } from 'src/domain/services/CommonService';

import { BusinessUseCases } from 'src/application/use-cases/BusinessUseCase';

import { Comercios } from '../database/mapper/Business.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comercios])],
  controllers: [BusinessController],
  providers: [BusinessUseCases, CommonService],
})
export class BusinessModule {}
