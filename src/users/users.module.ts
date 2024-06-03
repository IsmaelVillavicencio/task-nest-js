import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRepository } from './repository/user.repository';
import { UsersProjects } from './entities/users-projects.entity';

@Module({
	imports: [TypeOrmModule.forFeature([User, UsersProjects])],
	providers: [UsersService, UserRepository],
	controllers: [UsersController],
})
export class UsersModule { }
