import { Body, Controller, Get, NotFoundException, Param, ParseUUIDPipe, Post, Request, UnauthorizedException, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { Roles } from "../../auth/decorators/roles.decorator";
import { JwtAuthGuard } from "../../auth/guards/jwt.auth.guard";
import { RolesGuard } from "../../auth/guards/roles.guard";
import { ProjectsService } from "../../projects/services/projects.service";
import { UsersService } from "../../users/services/users.service";
import { CreateProjectUserDto } from "../dto/create-project-user.dto";
import { ProjectUsersService } from "../services/project-users.service";

@Controller('project-users')
export class ProjectUsersController {
  constructor(
    private readonly projectUsersService: ProjectUsersService,
    private readonly usersService: UsersService,
    private readonly projectsService: ProjectsService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UsePipes(ValidationPipe)
  @Roles("Admin", "ProjectManager", "Employee")
  async create(@Request() req, @Body() createProjectUserDto: CreateProjectUserDto) {
    if (req.user.role === "Employee") {
      throw new UnauthorizedException();
    }

    try {
      await this.usersService.findOne(createProjectUserDto.userId)
      await this.projectsService.findOne(createProjectUserDto.projectId)
    } catch (error) {
      throw new NotFoundException();
    }

    return this.projectUsersService.create(createProjectUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles()
  findAll(@Request() req) {
    return this.projectUsersService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("Admin", "ProjectManager")
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.projectUsersService.findOne(id);
  }
}
