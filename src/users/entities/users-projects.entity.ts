import { BaseEntity } from '../../config/base.entity';
import { ACCESS_LEVEL } from '../../config/roles';
import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Project } from '../../projects/entities/project.entity';

@Entity({ name: 'users_projects' })
export class UsersProjects extends BaseEntity {
	@Column({ type: 'enum', enum: ACCESS_LEVEL, default: ACCESS_LEVEL.MANTEINER })
	accessLevel: ACCESS_LEVEL;
	@ManyToOne(() => User, (user) => user.projects)
	user: User;
	@ManyToOne(() => Project, (project) => project.users)
	project: Project;
}
