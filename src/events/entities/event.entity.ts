import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";

@Entity()
export class Event {

  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column()
  public date!: Date;

  @Column({ nullable: true, default: 'Pending' })
  public eventStatus?: 'Pending' | 'Accepted' | 'Declined';

  @Column()
  public eventType!: 'RemoteWork' | 'PaidLeave';

  @Column({ nullable: true })
  public eventDescription?: string;

  @ManyToOne(() => User, (user) => user.id)
  public userId!: string;
}
