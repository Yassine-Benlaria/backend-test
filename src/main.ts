import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { InitialAdminSeed } from './database/initial-admin.seed';
import { AllExceptionsFilter } from './shared/exceptions/exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //validtion pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      forbidNonWhitelisted: true,
      whitelist: true,
    }),
  );

  app.useGlobalFilters(new AllExceptionsFilter());
  //swagger
  const config = new DocumentBuilder()
    .setTitle('Product Management API')
    .setDescription('The Product Management API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  //seed database
  const seeder = app.get(InitialAdminSeed);
  await seeder.seed();

  await app.listen(3000);
}
bootstrap();
