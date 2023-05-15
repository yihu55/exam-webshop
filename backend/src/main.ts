import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log('app is listening on port 4000');
  app.enableCors();

  await app.listen(4000);
}
bootstrap();
