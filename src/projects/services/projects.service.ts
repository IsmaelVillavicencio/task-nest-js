import { HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Project } from '../entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { projectDto, projectUpdateDto } from '../dto/project.dto';

@Injectable()
export class ProjectsService {

    constructor(
        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>,
    ) {}

    private handleException(error: any): void {
        if (error instanceof HttpException) {
            throw error;
        }
        throw new InternalServerErrorException(error.message);
    }

    public async createProject(project: projectDto): Promise<Project> {
        try {
            return await this.projectRepository.save(project);
        } catch (error) {
            this.handleException(error);
        }
    }

    public async getProjects(): Promise<Project[]> {
        try {
            const projects: Project[] = await this.projectRepository.find();
            if (projects.length === 0) {
                throw new NotFoundException('No projects found.');
            }
            return projects;
        } catch (error) {
            this.handleException(error);
        }
    }

    public async getProjectById(id: string): Promise<Project> {
        try {
            return await this.findProjectById(id);
        } catch (error) {
            this.handleException(error);
        }
    }

    public async updateProject(id: string, project: projectUpdateDto): Promise<Project> {
        try {
            const projectFound = await this.findProjectById(id);
            await this.projectRepository.update(projectFound.id, project);
            return await this.findProjectById(id);
        } catch (error) {
            this.handleException(error);
        }
    }

    public async deleteProject(id: string): Promise<void> {
        try {
            const projectFound = await this.findProjectById(id);
            await this.projectRepository.delete(projectFound.id);           
        } catch (error) {
            this.handleException(error);
        }
    }

    private async findProjectById(id: string): Promise<Project> {
        try {
            const project = await this.projectRepository.createQueryBuilder('project').where('project.id = :id', { id }).getOne();
            if (!project) {
                throw new NotFoundException(`Project with id [${id}] not found.`);
            }
            return project;
        } catch (error) {
            this.handleException(error);
        }
    }
}
