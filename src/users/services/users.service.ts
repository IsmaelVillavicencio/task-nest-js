import { HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { In, Repository } from 'typeorm';
import { AddProjectToUserDto, UserDto, UserUpdateDto } from '../dto/user.dto';
import { UserRepository } from '../repository/user.repository';
import { UsersProjects } from '../entities/users-projects.entity';

@Injectable()
export class UsersService {

    
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(UsersProjects)
        private readonly usersProjectsRepository: Repository<UsersProjects>,
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
    
    public async addProjectToUser(body: AddProjectToUserDto): Promise<UsersProjects> {
        try {
            return await this.usersProjectsRepository.save(body);
        }catch (error) {
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

    public async updateUser(id: string, userUpdate: UserUpdateDto): Promise<User> {
        try {
            const userFound = await this.findUserById(id);
            await this.userRepository.update(userFound.id, userUpdate);
            return await this.findUserById(id);
        } catch (error) {
            this.handleException(error);
        }
    }

    public async deleteUser(id: string): Promise<void> {
        try {
            const userFound = await this.findUserById(id);
            await this.userRepository.delete(userFound.id);
        } catch (error) {
            this.handleException(error);
        }
    }

    public async findUserByName(firstName: string, lastName: string): Promise<User[]> {
        try {
            const users = await this.userRepositorycustom.findByName(firstName, lastName);
            if (users.length === 0) {
                throw new NotFoundException(`User with first name [${firstName}] and last name [${lastName}] not found.`);
            }
            return users;
        } catch (error) {
            this.handleException(error);
        }
    }

    private async findUserById(id: string): Promise<User> {
        try {
            const user = await this.userRepository.createQueryBuilder('user').where('user.id = :id', { id })
            .leftJoinAndSelect('user.projects', 'projects')
            .leftJoinAndSelect('projects.project', 'project')
            .getOne();
            console.log({user})
            if (!user) {
                throw new NotFoundException(`User with id ${id} not found.`);
            }
            return user;
        } catch (error) {
            this.handleException(error);
        }
    }

}
