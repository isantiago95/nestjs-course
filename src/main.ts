import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json } from 'express';

const { CURRENCY, PORT } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  app.use(json({ limit: '60mb' }));
  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('API NestJS')
    .setDescription('Esta es la api de nest curso')
    .setVersion('1.0')
    .addTag('courses')
    .addTag('videos')
    .addTag('auth')
    .addTag('awards')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);

  console.log('__ENV__', { CURRENCY, PORT });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
