import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Task } from '../tasks/task.entity';
import { Redemption } from './redemption.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  passwordHash: string;

  @Column({ default: 0 })
  score: number;

  @Column({ default: 'USER' }) // 'ADMIN' | 'USER'
  role: string;

  @OneToMany(() => Task, task => task.user)
  tasks: Task[];

  @OneToMany(() => Redemption, redemption => redemption.user)
  redemptions: Redemption[];
}
