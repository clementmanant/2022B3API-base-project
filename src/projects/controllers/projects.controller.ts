import { Controller, Get, Post, Body, Param, ParseUUIDPipe, NotFoundException, UseGuards, ValidationPipe, UsePipes } from '@nestjs/common';
import { ProjectsService } from '../services/projects.service';
import { CreateProjectDto } from '../dto/create-project.dto';
import { Project } from '../entities/project.entity';
import { Roles } from '../../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt.auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UsePipes(ValidationPipe)
  @Roles("Admin")
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles()
  findAll(): Promise<Project[]> {
    return this.projectsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles()
  findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<Project> | string {
    try {
      return this.projectsService.findOne(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
