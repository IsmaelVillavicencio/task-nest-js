import { Injectable } from '@nestjs/common';
import { Project } from '../entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { projectDto, projectUpdateDto } from '../dto/project.dto';

@Injectable()
export class ProjectsService {

    constructor(
        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>,
    ) {}

    public async createProject(project: projectDto): Promise<Project> {
        try {
            return await this.projectRepository.save(project);
        } catch (error) {
            throw new Error(error.toString());
        }
    }

    public async getProjects(): Promise<Project[]> {
        try {
            return await this.projectRepository.find();
        } catch (error) {
            throw new Error(error.toString());
        }
    }

    public async getProjectById(id: string): Promise<Project> {
        try {
            return await this.projectRepository.createQueryBuilder('project').where('project.id = :id', { id }).getOne();
        } catch (error) {
            throw new Error(error.toString());
        }
    }

    public async updateProject(id: string, project: projectUpdateDto): Promise<UpdateResult | undefined> {
        try {
            const projectUpdate: UpdateResult = await this.projectRepository.update(id, project);
            if (projectUpdate.affected === 0) {
                return undefined;
            }
            return projectUpdate;
            
        } catch (error) {
            throw new Error(error.toString());
        }
    }

    public async deleteProject(id: string): Promise<DeleteResult|undefined> {
        try {
            const project: DeleteResult = await this.projectRepository.delete(id);
            if (project.affected === 0) {
                return undefined;
            }
            return project;
        } catch (error) {
            throw new Error(error.toString());
        }
    }
}
