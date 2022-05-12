import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

const config = new ConfigService();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const userApiOptions = new DocumentBuilder()
    .setTitle('Blog API Doc')
    .setDescription('Blog API Info')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'jwt',
    )
    .addTag('blog')
    .build();
  const userApiDocument = SwaggerModule.createDocument(app, userApiOptions);
  SwaggerModule.setup('doc', app, userApiDocument);
  // const port = config.get<number>('PORT', 3001);
  app.connectMicroservice({
    options: {
      port: '3001',
      retryAttempts: 5,
      retryDelay: 1000,
    },
  });
  await app.listen(3001);
}
bootstrap();
