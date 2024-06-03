import { Injectable } from "@nestjs/common";
import { JsonResponse } from "src/interfaces/json-response";

@Injectable()
export class ResponseService {
    public signJsonResponse(
        statusCode: number,
        title: string,
        message: string,
        data?: any,
    ): JsonResponse {
        return {
            statusCode,
            title,
            message,
            data
        };
    }
}