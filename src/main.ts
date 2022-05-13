import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  const config = app.get(ConfigService);
  const userApiOptions = new DocumentBuilder()
    .setTitle('Blog API Doc')
    .setDescription('Blog API Info')
    .setVersion(config.get('APP_VERSION'))
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'jwt',
    )
    .addTag('blog')
    .build();
  const userApiDocument = SwaggerModule.createDocument(app, userApiOptions);
  SwaggerModule.setup('doc', app, userApiDocument);
  const port = config.get<number>('APP_PORT');
  app.connectMicroservice({
    options: {
      port: port,
      retryAttempts: 5,
      retryDelay: 1000,
    },
  });
  await app.listen(port);
}

bootstrap();
