import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

import { config } from 'dotenv';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './swagger.config';
config();

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.useGlobalPipes(new ValidationPipe());

  SwaggerModule.setup(
    'doc',
    app,
    SwaggerModule.createDocument(app, swaggerConfig),
  );

  await app.listen(
    process.env.HTTP_PORT || 3000,
    process.env.HOST || 'localhost',
  );
}
bootstrap();
