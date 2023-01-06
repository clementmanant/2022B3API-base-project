import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "../../projects/entities/project.entity";
import { User } from "../../users/entities/user.entity";

@Entity()
export class ProjectUser {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @ManyToOne(() => User, (user) => user.id)
  public userId: string;
  
  @ManyToOne(() => Project, (project) => project.id)
  public projectId!: string;

  @Column()
  public startDate!: Date;

  @Column()
  public endDate!: Date;

}
