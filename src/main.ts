import { BankLogger, RequestLoggerMiddleware } from '@bank/logger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import 'newrelic';
import { AppModule } from './app.module';
import { SwaggerFactory } from './infra/docs/swagger/swagger.factory';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new BankLogger(),
    bufferLogs: true,
  });

  app.use(RequestLoggerMiddleware);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),                       
  );

  SwaggerFactory.create(app);

  const port = process.env.PORT;

  await app.listen(port);

  Logger.log(`${process.env.npm_package_name} is listening - PORT ${port}`);
}
bootstrap();
