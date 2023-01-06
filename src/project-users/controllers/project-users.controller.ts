import { Controller, Get, Param, ParseUUIDPipe, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { Roles } from "../../auth/decorators/roles.decorator";
import { JwtAuthGuard } from "../../auth/guards/jwt.auth.guard";
import { RolesGuard } from "../../auth/guards/roles.guard";

@Controller('project-users')
export class ProjectUsersController {
  constructor() {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UsePipes(ValidationPipe) // DTO
  @Roles("Admin", "ProjectManager")
  create() {
    return "Should return a new pu";
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles()
  findAll() {
    return "Return all project-users";
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("Admin", "ProjectManager")
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return "Return one project-user";
  }
}
