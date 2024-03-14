import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import * as jsYaml from 'js-yaml';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.disable('x-powered-by');
  app.setGlobalPrefix('api');
  app.enableCors();

  // pipe line for validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('TASK API')
    .setDescription('API documentation for task api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const yamlDocument = jsYaml.dump(document);
  writeFileSync('./openapi.yaml', yamlDocument);
  SwaggerModule.setup('docs', app, document);

  await app.listen(8000);
}
bootstrap();
