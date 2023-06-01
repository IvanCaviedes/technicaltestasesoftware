import { Module } from '@nestjs/common';
import { BusinessController } from 'src/presentation/controllers/business.controller';

@Module({
  imports: [],
  controllers: [BusinessController],
  providers: [],
})
export class BusinessModule {}
