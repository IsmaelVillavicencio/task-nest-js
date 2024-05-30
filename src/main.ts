import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
//logs
import * as morgan from 'morgan';
import { CORS } from './constants';
import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './utils/http-exception.filter';
import { CustomValidationPipe } from './utils/custom-validation.pipe';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(morgan('dev'));
    app.setGlobalPrefix('api');
    app.enableCors(CORS);
    app.useGlobalPipes(new CustomValidationPipe());
    app.useGlobalFilters(new HttpExceptionFilter());
    const configService = app.get(ConfigService);
    await app.listen(configService.get('PORT'));
    console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
