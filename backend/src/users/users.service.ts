import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({ where: { username } });
    return user || undefined;
  }

  async create(username: string, passwordHash: string): Promise<User> {
    const user = this.usersRepository.create({ username, passwordHash });
    return this.usersRepository.save(user);
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
}
