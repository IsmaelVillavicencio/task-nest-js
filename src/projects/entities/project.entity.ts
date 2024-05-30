import { UsersProjects } from '../../users/entities/users-projects.entity';
import { BaseEntity } from '../../config/base.entity';
import { IProject } from '../../interfaces/contract.interface';
import { User } from '../../users/entities/user.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'projects' })
export class Project extends BaseEntity implements IProject {

	@Column()
	name: string;

	@Column()
	description: string;

	@OneToMany(() => UsersProjects, (user) => user.project)
	users: User[];
}
