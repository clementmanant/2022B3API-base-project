import { Controller, Get, Post, Body, Param, ParseUUIDPipe, NotFoundException, UseGuards, ValidationPipe, UsePipes, Request, UnauthorizedException } from '@nestjs/common';
import { ProjectsService } from '../services/projects.service';
import { CreateProjectDto } from '../dto/create-project.dto';
import { Project } from '../entities/project.entity';
import { Roles } from '../../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt.auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { UsersService } from '../../users/services/users.service';

@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService, 
    private readonly usersService: UsersService
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UsePipes(ValidationPipe)
  // Return 403 if only Admin in Roles and can't access to the route
  @Roles("Admin", "ProjectManager", "Employee")
  async create(@Body() createProjectDto: CreateProjectDto, @Request() req) {
    const referringEmployee = await this.usersService.findOne(createProjectDto.referringEmployeeId);
    if (referringEmployee.role === "Employee") {
      throw new UnauthorizedException();
    }

    if (req.user.role !== "Admin") {
      throw new UnauthorizedException();
    }
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles()
  findAll(): Promise<Project[]> { //@Request() req): Promise<Project[]> {
    // console.log(req.user.role);
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
