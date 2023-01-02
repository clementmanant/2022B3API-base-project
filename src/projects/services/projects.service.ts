import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto } from '../dto/create-project.dto';
import { Project } from '../entities/project.entity';

@Injectable()
export class ProjectsService {

  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>, 
  ) {}

  create(project: CreateProjectDto): Promise<Project> {
    const newProject = this.projectsRepository.create(project);
    return this.projectsRepository.save(newProject);
  }

  findAll(): Promise<Project[]> {
    return this.projectsRepository.find();
  }

  async findOne(id: string) {
    const project = await this.projectsRepository.findOneBy({ id })
    if (!project) {
      throw new NotFoundException();
    }
    return project;
  }
}
