import { Body, Controller, Get, Param, Post, Put, Res } from '@nestjs/common';
import { ProjectsService } from '../services/projects.service';
import { ResponseService } from 'src/utils/json-response.service';
import { projectDto } from '../dto/project.dto';
import { Response } from 'express';
import { JsonResponse } from 'src/interfaces/json-response';

@Controller('projects')
export class ProjectsController {
    constructor(
        private readonly projectsService: ProjectsService,
        private readonly responseService: ResponseService
    ) {
    }

    @Get('all')
    public async getProjects(@Res() res: Response) {
        return this.createJsonResponse(res, 'OK', 'All projects', await this.projectsService.getProjects());
    }

    @Post('register')
    public async createProject(@Body() body: projectDto, @Res() res: Response) {
        return this.createJsonResponse(res, 'Project created', 'Project created successfully', await this.projectsService.createProject(body));
    }

    @Get(':id')
    public async getProjectById(@Param('id') id:string ,@Res() res: Response) {
        return this.createJsonResponse(res, 'Project found', 'Project found successfully', await this.projectsService.getProjectById(id));
    }

    @Put(':id')
    public async updateProject(@Param('id') id: string, @Body() body: projectDto, @Res() res: Response) {
        return this.createJsonResponse(res, 'Project updated', 'Project updated successfully', await this.projectsService.updateProject(id, body));
    }

    private createJsonResponse( res: Response, title: string, message: string, data?: any): Response<JsonResponse> {
        const statusCode = res.statusCode;
        const jsonResponse = this.responseService.signJsonResponse(statusCode, title, message, data);
        return res.status(statusCode).json(jsonResponse);
    }
}
