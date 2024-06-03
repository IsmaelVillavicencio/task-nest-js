import { IsNumber, IsOptional, IsString } from "class-validator";

export interface JsonResponse {
    statusCode: number;
    title: string;
    message: string;
    data: any;
}