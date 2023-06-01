import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from '../ormconfig';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { setEnvironment } from 'src/infrastructure/environments';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: setEnvironment(), isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
