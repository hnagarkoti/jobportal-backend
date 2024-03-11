import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidateInputPipe } from './core/pipes/validate.pipe';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api/v1'); // Adding Global Prefix
  // handle all user input validation globally
  // app.useGlobalPipes(new ValidateInputPipe());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3001);
}
bootstrap();
