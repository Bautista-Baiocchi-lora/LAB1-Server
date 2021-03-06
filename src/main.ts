import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { QueryFailedExceptionFilter } from './query-failed.exception.filter';
import { JwtExceptionFilter } from './session/jwt.exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new QueryFailedExceptionFilter());
  app.useGlobalFilters(new JwtExceptionFilter());
  await app.listen(3500);
}
bootstrap();
