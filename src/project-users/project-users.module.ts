import { Module } from "@nestjs/common";
import { ProjectUsersController } from "./controllers/project-users.controller";

@Module({
  imports: [], // [TypeOrmModule.forFeature([Project])],
  controllers: [ProjectUsersController],
  providers: []
})
export class ProjectUsersModule {}
