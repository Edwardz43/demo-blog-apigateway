import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const port = 3001;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const userApiOptions = new DocumentBuilder()
    .setTitle('Blog API Doc')
    .setDescription('Blog API Info')
    .setVersion('1.0')
    .addTag('blog')
    .build();
  const userApiDocument = SwaggerModule.createDocument(app, userApiOptions);
  SwaggerModule.setup('doc', app, userApiDocument);
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
