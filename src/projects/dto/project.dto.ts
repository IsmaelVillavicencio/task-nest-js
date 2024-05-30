import { IsNotEmpty, IsString, IsOptional } from "class-validator";

export class projectDto {
    @IsNotEmpty()
    @IsString()
	name: string;
    
    @IsNotEmpty()
    @IsString()
	description: string;
}

export class projectUpdateDto {
    @IsOptional()
    @IsString()
    name: string;
    
    @IsOptional()
    @IsString()
    description: string;
}