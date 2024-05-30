import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserDto } from '../dto/user.dto';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ) {}

    @Post('register')
    public async createUser(@Body() body: UserDto) {
        return await this.usersService.createUser(body);
    }

    @Get('all')
    public async getUsers() {
        return await this.usersService.getUsers();
    }

    @Get(':id')
    public async getUserById(@Param('id') id: string) {
        return await this.usersService.getUserById(id);
    }

    @Delete(':id')
    public async deleteUser(@Param('id') id: string) {
        return await this.usersService.deleteUser(id);
    }

    @Get('find/:firstName/:lastName')
    public async findUserByName(@Param('firstName') firstName: string, @Param('lastName') lastName: string) {
        return await this.usersService.findUserByName(firstName, lastName);
    }
}
