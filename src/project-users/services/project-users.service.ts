import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectUserDto } from '../dto/create-project-user.dto';
import { ProjectUser } from '../entities/project-users.entity';

@Injectable()
export class ProjectUsersService {

  constructor(
    @InjectRepository(ProjectUser)
    private projectUsersRepository: Repository<ProjectUser>, 
  ) {}

  create(projectUser: CreateProjectUserDto): Promise<ProjectUser> {
    const newProjectUser = this.projectUsersRepository.create(projectUser);
    return this.projectUsersRepository.save(newProjectUser);
  }

  findAll(): Promise<ProjectUser[]> {
    return this.projectUsersRepository.find();
  }

  async findOne(id: string) {
    const projectUser = await this.projectUsersRepository.findOneBy({ id })
    if (!projectUser) {
      throw new NotFoundException();
    }
    return projectUser;
  }
}
