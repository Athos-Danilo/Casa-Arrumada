import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    private usersService: UsersService,
  ) {}

  async findAll(): Promise<Task[]> {
    return this.tasksRepository.find({ relations: ['user'] });
  }

  async getHistory(userId: number): Promise<Task[]> {
    return this.tasksRepository.find({
      where: { user: { id: userId }, status: 'COMPLETED' },
      order: { id: 'DESC' }
    });
  }

  async create(title: string, description: string, priority: string = 'NORMAL'): Promise<Task> {
    const task = this.tasksRepository.create({ title, description, priority });
    return this.tasksRepository.save(task);
  }

  async claimTask(taskId: number, userId: number): Promise<Task> {
    const task = await this.tasksRepository.findOne({ where: { id: taskId }, relations: ['user'] });
    if (!task) throw new NotFoundException('Task not found');
    if (task.user) throw new BadRequestException('Task already claimed');
    
    // For MVP, user is fetched lightly. In real scenario, would fetch full user entity via UsersService
    task.user = { id: userId } as any; 
    task.status = 'IN_PROGRESS';
    return this.tasksRepository.save(task);
  }

  async completeTask(taskId: number, userId: number): Promise<Task> {
    const task = await this.tasksRepository.findOne({ where: { id: taskId }, relations: ['user'] });
    if (!task) throw new NotFoundException('Task not found');
    if (task.status === 'COMPLETED') throw new BadRequestException('Task already completed');
    if (!task.user || task.user.id !== userId) throw new BadRequestException('You do not own this task');
    
    task.status = 'COMPLETED';
    
    // Score update
    const points = task.priority === 'HIGH' ? 20 : 10;
    await this.usersService.updateScore(userId, points);
    
    return this.tasksRepository.save(task);
  }
}
