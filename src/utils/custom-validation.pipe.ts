import { BadRequestException, ValidationError, ValidationPipe } from "@nestjs/common";

export class CustomValidationPipe extends ValidationPipe {
    constructor() {
        super({
            transformOptions: {
                enableImplicitConversion: true,
            },
            exceptionFactory: (errors: ValidationError[] = []) => {
                const messages = errors.map((error) => ({
                  property: error.property,
                  constraints: error.constraints,
                }));
                return new BadRequestException({ message: messages });
              },
        });
    }
}