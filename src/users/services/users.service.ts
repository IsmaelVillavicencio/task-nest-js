import { HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserDto, UserUpdateDto } from '../dto/user.dto';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private userRepositorycustom: UserRepository,
    ) { }

    private handleException(error: any): void {
        if (error instanceof HttpException) {
            throw error;
        }
        throw new InternalServerErrorException(error.message);
    }

    public async createUser(user: UserDto): Promise<User> {
        try {
            return await this.userRepository.save(user);
        } catch (error) {
            this.handleException(error);
        }
    }

    public async getUsers(): Promise<User[]> {
        try {
            const users: User[] = await this.userRepository.find();
            if (users.length === 0) {
                throw new NotFoundException('No users found.');
            }
            return users;
        } catch (error) {
            this.handleException(error);
        }
    }

    public async getUserById(id: string): Promise<User> {
        try {
           return await this.findUserById(id);
        } catch (error) {
            this.handleException(error);
        }
    }

    public async updateUser(id: string, userUpdate: UserUpdateDto): Promise<UpdateResult | undefined> {
        try {
            const user: UpdateResult = await this.userRepository.update(id, userUpdate);
            if (user.affected === 0) {
                return undefined;
            }
            return user;
        } catch (error) {
            this.handleException(error);
        }
    }

    public async deleteUser(id: string): Promise<{ success: boolean; message: string; data?: DeleteResult }> {
        try {
            const result = await this.userRepository.delete(id);
            if (!result.affected) {
                throw new NotFoundException(`User with id ${id} not found.`);
            }
            return { success: true, message: 'User deleted successfully', data: result };
        } catch (error) {
            this.handleException(error);
            return { success: false, message: (error as Error).message };
        }

    }

    public async findUserByName(firstName: string, lastName: string): Promise<User[]> {
        try {
            const users = await this.userRepositorycustom.findByName(firstName, lastName);
            if (users.length === 0) {
                throw new NotFoundException(`User with name ${firstName} ${lastName} not found.`);
            }
            return users;
        } catch (error) {
            this.handleException(error);
        }
    }

    private async findUserById(id: string): Promise<User> {
        try {
            const user = await this.userRepository.createQueryBuilder('user').where('user.id = :id', { id }).getOne();
            if (!user) {
                throw new NotFoundException(`User with id ${id} not found.`);
            }
            return user;
        } catch (error) {
            this.handleException(error);
        }
    }

}
