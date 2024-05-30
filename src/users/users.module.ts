import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRepository } from './repository/user.repository';

@Module({
	imports: [TypeOrmModule.forFeature([User])],
	providers: [UsersService, UserRepository],
	controllers: [UsersController],
})
export class UsersModule { }