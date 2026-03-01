import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  });

  const port = Number(process.env.PORT || 4000);
  await app.listen(port, '0.0.0.0');

  console.log(`Backend running on port ${port}`);
}
bootstrap();
