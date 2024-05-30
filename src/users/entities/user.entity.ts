import { BaseEntity } from '../../config/base.entity';
import { ROLES } from '../../config/roles';
import { IUser } from '../../interfaces/user.interface';
import { Project } from '../../projects/entities/project.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { UsersProjects } from '../../users/entities/users-projects.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity implements IUser {

    @Column()
    firstName: string;

    @Column()
    lastName: string;
    @Column()
    age: number;

    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column({ type: 'enum', enum: ROLES, default: ROLES.BASIC })
    role: ROLES;

    @OneToMany(() => UsersProjects, (project) => project.user)
    projects: Project[];

}
