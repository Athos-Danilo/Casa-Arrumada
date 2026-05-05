import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: 'PENDING' }) // PENDING, COMPLETED
  status: string;

  @Column({ default: 'NORMAL' }) // NORMAL, HIGH
  priority: string;

  @ManyToOne(() => User, user => user.tasks, { nullable: true })
  user: User;
}
