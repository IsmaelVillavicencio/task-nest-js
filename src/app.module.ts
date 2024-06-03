import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceConfig } from './config/data.source';
import { ProjectsModule } from './projects/projects.module';
import { GlobalModuleModule } from './global-module/global-module.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: `.development.env`,
			isGlobal: true,
		}),
		TypeOrmModule.forRoot({
			...DataSourceConfig,
		}),
		UsersModule,
		ProjectsModule,
		GlobalModuleModule,
	],
})
export class AppModule { }
