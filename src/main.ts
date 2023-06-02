import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config: ConfigService = app.get(ConfigService);

  const PORT: number = config.get<number>('PORT');
  const HOST = config.get('HOST');

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const APP_NAME = config.get('APP_NAME');
  const APP_DESCRIPTION = config.get('APP_DESCRIPTION');
  const API_VERSION = config.get('API_VERSION', 'v1');

  const options = new DocumentBuilder()
    .setTitle(APP_NAME)
    .setDescription(APP_DESCRIPTION)
    .setVersion(API_VERSION)
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api', app, document);
  SwaggerModule.setup('/', app, document);

  Logger.log('Creando swagger para las rutas (/, /api)', 'RouterExplorer');

  await app.listen(PORT, () => {
    process.env.NODE_ENV !== 'production'
      ? Logger.log(
          `🚀  Server ready at http://${HOST}:${PORT}`,
          'Bootstrap',
          false,
        )
      : Logger.log(
          `🚀  Server is listening on port ${PORT}`,
          'Bootstrap',
          false,
        );
  });
}
bootstrap();
