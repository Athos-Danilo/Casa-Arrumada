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

  async create(title: string, description: string, priority: string = 'NORMAL', points: number = 10, timeLimit?: number): Promise<Task> {
    const task = this.tasksRepository.create({ title, description, priority, points, timeLimit });
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
    if (task.status !== 'IN_PROGRESS') throw new BadRequestException('Task is not in progress');
    if (task.user.id !== userId) throw new BadRequestException('You can only complete your own tasks');
    
    task.status = 'COMPLETED';
    await this.tasksRepository.save(task);

    // Adicionar pontos ao usuário
    await this.usersService.updateScore(userId, task.points);

    return task;
  }

  async deleteTask(taskId: number): Promise<void> {
    const task = await this.tasksRepository.findOne({ where: { id: taskId } });
    if (!task) throw new NotFoundException('Task not found');
    await this.tasksRepository.remove(task);
  }
}
