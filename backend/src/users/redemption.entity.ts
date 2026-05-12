import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Redemption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rewardTitle: string;

  @Column()
  pointsCost: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, user => user.redemptions, { onDelete: 'CASCADE' })
  user: User;
}
