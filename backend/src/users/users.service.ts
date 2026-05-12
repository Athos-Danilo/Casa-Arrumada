import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Redemption } from './redemption.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Redemption)
    private redemptionsRepository: Repository<Redemption>,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({ where: { username } });
    return user || undefined;
  }

  async create(username: string, passwordHash: string, role: string = 'USER'): Promise<User> {
    const newUser = this.usersRepository.create({ username, passwordHash, score: 0, role });
    return this.usersRepository.save(newUser);
  }

  async updateScore(userId: number, points: number): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (user) {
      user.score += points;
      await this.usersRepository.save(user);
    }
  }

  async getRanking(): Promise<User[]> {
    return this.usersRepository.find({
      order: { score: 'DESC' },
      take: 10, // Top 10 users
      select: ['id', 'username', 'score'] // Exclude sensitive info like passwordHash
    });
  }

  async findOneById(id: number): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({ where: { id } });
    return user || undefined;
  }

  async getMyRedemptions(userId: number): Promise<Redemption[]> {
    return this.redemptionsRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' }
    });
  }

  async redeemPoints(userId: number, points: number, rewardTitle: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }
    if (user.score < points) {
      throw new Error('Insufficient points');
    }
    user.score -= points;
    await this.usersRepository.save(user);

    const redemption = this.redemptionsRepository.create({
      user: { id: userId } as User,
      rewardTitle,
      pointsCost: points
    });
    await this.redemptionsRepository.save(redemption);

    return user;
  }
}
