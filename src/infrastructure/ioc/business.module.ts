import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessController } from 'src/presentation/controllers/business.controller';
import { Comercios } from '../database/mapper/Business.entity';
import { BusinessUseCases } from 'src/application/use-cases/BusinessUseCase';
import { CommonService } from 'src/domain/services/CommonService';

@Module({
  imports: [TypeOrmModule.forFeature([Comercios])],
  controllers: [BusinessController],
  providers: [BusinessUseCases, CommonService],
})
export class BusinessModule {}
