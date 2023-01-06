import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProjectUsersController } from "./controllers/project-users.controller";
import { ProjectUser } from "./entities/project-users.entity";
import { ProjectUsersService } from "./services/project-users.service";
import { UsersModule } from '../users/users.module';
import { ProjectsModule } from "../projects/projects.module";

@Module({
  imports: [TypeOrmModule.forFeature([ProjectUser]), UsersModule, ProjectsModule],
  controllers: [ProjectUsersController],
  providers: [ProjectUsersService]
})
export class ProjectUsersModule {}
