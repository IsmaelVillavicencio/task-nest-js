import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Request, Response } from 'express';
import { transformDate } from "./date-transformer";
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        const responseBody: any = {
            statusCode: status,
            timestamp: transformDate(new Date()),
            path: request.url,
            method: request.method
        };

        // Si la excepción es BadRequestException, incluye los detalles de validación
        if (exception instanceof BadRequestException) {
            const exceptionResponse = exception.getResponse() as any;
            responseBody.message = 'Validation failed';
            responseBody.errors = exceptionResponse.message || [];
        } else {
            responseBody.message = exception.message || null;
        }

        response
            .status(status)
            .json(responseBody);
    }
}