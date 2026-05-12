import { Component, OnInit, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  taskService = inject(TaskService);
  authService = inject(AuthService);

  newTaskTitle = '';
  newTaskDesc = '';
  newTaskPriority = 'NORMAL';
  newTaskPoints = 10;
  newTaskTimeLimit: number | null = null;

  get currentUser() {
    return this.authService.currentUser();
  }

  // Computed signal to filter PENDING tasks and sort by priority
  pendingTasks = computed(() => {
    return this.taskService.tasks()
      .filter(t => t.status !== 'COMPLETED')
      .sort((a, b) => {
        if (a.priority === 'HIGH' && b.priority !== 'HIGH') return -1;
        if (b.priority === 'HIGH' && a.priority !== 'HIGH') return 1;
        return b.id - a.id;
      });
  });

  ngOnInit() {
    this.taskService.loadTasks().subscribe();
  }

  addTask() {
    if (this.newTaskTitle.trim()) {
      this.taskService.createTask({
        title: this.newTaskTitle,
        description: this.newTaskDesc,
        priority: this.newTaskPriority,
        points: this.newTaskPoints,
        timeLimit: this.newTaskTimeLimit
      }).subscribe(() => {
        this.newTaskTitle = '';
        this.newTaskDesc = '';
        this.newTaskPriority = 'NORMAL';
        this.newTaskPoints = 10;
        this.newTaskTimeLimit = null;
      });
    }
  }

  claim(id: number) {
    this.taskService.claimTask(id).subscribe();
  }

  complete(id: number) {
    this.taskService.completeTask(id).subscribe();
  }

  deleteTask(id: number) {
    if (confirm('Tem certeza que deseja apagar esta tarefa definitivamente?')) {
      this.taskService.deleteTask(id).subscribe();
    }
  }

  isMyTask(task: any): boolean {
    if (!task.user || !this.currentUser) return false;
    return task.user.id === this.currentUser.id || task.user.username === this.currentUser.username;
  }
}
