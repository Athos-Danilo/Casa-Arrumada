import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Request, ForbiddenException } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get('history')
  getHistory(@Request() req) {
    return this.tasksService.getHistory(req.user.userId);
  }

  @Post()
  create(@Body() body: { title: string, description: string, priority?: string, points?: number, timeLimit?: number }, @Request() req) {
    if (req.user.role !== 'ADMIN') {
      throw new ForbiddenException('Somente administradores podem criar tarefas');
    }
    return this.tasksService.create(body.title, body.description, body.priority, body.points, body.timeLimit);
  }

  @Patch(':id/claim')
  claimTask(@Param('id') id: string, @Request() req) {
    if (req.user.role === 'ADMIN') {
      throw new ForbiddenException('Administradores não podem assumir tarefas');
    }
    return this.tasksService.claimTask(+id, req.user.userId);
  }

  @Patch(':id/complete')
  completeTask(@Param('id') id: string, @Request() req) {
    if (req.user.role === 'ADMIN') {
      throw new ForbiddenException('Administradores não podem concluir tarefas');
    }
    return this.tasksService.completeTask(+id, req.user.userId);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string, @Request() req) {
    if (req.user.role !== 'ADMIN') {
      throw new ForbiddenException('Apenas administradores podem apagar tarefas');
    }
    return this.tasksService.deleteTask(+id);
  }
}
