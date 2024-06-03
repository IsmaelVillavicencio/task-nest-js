import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserDto, UserUpdateDto } from '../dto/user.dto';
import { ResponseService } from 'src/utils/json-response.service';
import { Response } from 'express';
import { JsonResponse } from 'src/interfaces/json-response';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly responseService: ResponseService
    ) {
    }

    @Post('register')
    public async createUser(@Body() body: UserDto, @Res() res: Response) {
        return this.createJsonResponse(res, 'User created', 'User created successfully', await this.usersService.createUser(body));
    }

    @Get('all')
    public async getUsers(@Res() res: Response) {
        return this.createJsonResponse(res, 'OK', 'All users', await this.usersService.getUsers()); 
    }

    @Get(':id')
    public async getUserById(@Param('id') id: string, @Res() res: Response) {
        return this.createJsonResponse(res, 'User found', 'User found successfully', await this.usersService.getUserById(id));
    }

    @Put(':id')
    public async updateUser(@Param('id') id: string, @Body() body: UserUpdateDto, @Res() res: Response) {
        return this.createJsonResponse(res, 'User updated', 'User updated successfully', await this.usersService.updateUser(id, body));
    }

    @Delete(':id')
    public async deleteUser(@Param('id') id: string, @Res() res: Response) {
        await this.usersService.deleteUser(id);
        return this.createJsonResponse(res, 'User deleted', 'User deleted successfully');
    }

    @Get('find/:firstName/:lastName')
    public async findUserByName(@Param('firstName') firstName: string, @Param('lastName') lastName: string) {
        return await this.usersService.findUserByName(firstName, lastName);
    }

    private createJsonResponse( res: Response, title: string, message: string, data?: any): Response<JsonResponse> {
        const statusCode = res.statusCode;
        const jsonResponse = this.responseService.signJsonResponse(statusCode, title, message, data);
        return res.status(statusCode).json(jsonResponse);
    }
}
