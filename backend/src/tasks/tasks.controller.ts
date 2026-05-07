import { Controller, Get, Post, Body, Param, Patch, UseGuards, Request } from '@nestjs/common';
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
  create(@Body() body: { title: string, description: string, priority?: string }) {
    return this.tasksService.create(body.title, body.description, body.priority);
  }

  @Patch(':id/claim')
  claimTask(@Param('id') id: string, @Request() req) {
    return this.tasksService.claimTask(+id, req.user.userId);
  }

  @Patch(':id/complete')
  completeTask(@Param('id') id: string, @Request() req) {
    return this.tasksService.completeTask(+id, req.user.userId);
  }
}
