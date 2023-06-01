import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ['./dist/src/infrastructure/database/mapper/*.entity.js'],
      migrationsTableName: 'migrations',
      logger: 'file',
      logging: true,
      synchronize: false,
      extra: {
        // server: `DESKTOP-KS4UU5U\SQLEXPRESS`,
        encrypt: false,
        trustServerCertificate: true,
      },
    };
  }
}
