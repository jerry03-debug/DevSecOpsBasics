import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './filters/all-exceptions';

const PORT = process.env.SERVER_PORT ?? 5000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Utilisation des filters pour les exceptions
  app.useGlobalFilters(new AllExceptionsFilter());
  // Active le ValidationPipe globalement
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Supprime les champs non définis dans le DTO
      forbidNonWhitelisted: true, // Rejette les champs non définis dans le DTO
      transform: true, // Transforme les données en instance du DTO
    }),
  );
  await app.listen(PORT);
}
//bootstrap then conosle port

bootstrap().then(()=>console.log("Running on port "+ PORT));
