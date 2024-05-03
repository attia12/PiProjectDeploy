/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  // const reflector=new Reflector();
  // app.useGlobalGuards(new AtGuard(reflector));
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
