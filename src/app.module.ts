import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { setEnvironment } from 'src/infrastructure/environments';
import { TypeOrmConfigService } from '../ormconfig';

import { BusinessModule } from './infrastructure/ioc/business.module';
import { ServicesModule } from './infrastructure/ioc/services.module';
import { TurnModule } from './infrastructure/ioc/turns.module';

@Module({
  imports: [
    BusinessModule,
    ServicesModule,
    TurnModule,

    ConfigModule.forRoot({ envFilePath: setEnvironment(), isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
