import { Exclude } from "class-transformer";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "../../projects/entities/project.entity";


@Entity()
export class User {

  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column({ unique: true })
  public username!: string;

  @Column({ unique: true })
  public email!: string;

  @Column()
  @Exclude()
  public password!: string;

  @Column({ default: 'Employee' })
  public role!: 'Employee' | 'Admin' | 'ProjectManager';

  @OneToMany(() => Project, (project) => project.referringEmployeeId)
  projects: Project[]
}
