import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from '../ormconfig';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { setEnvironment } from 'src/infrastructure/environments';
import { BusinessModule } from './infrastructure/ioc/business.module';
import { ServicesModule } from './infrastructure/ioc/services.module';

@Module({
  imports: [
    BusinessModule,
    ServicesModule,

    ConfigModule.forRoot({ envFilePath: setEnvironment(), isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
