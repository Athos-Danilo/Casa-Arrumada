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
        priority: this.newTaskPriority
      }).subscribe(() => {
        this.newTaskTitle = '';
        this.newTaskDesc = '';
        this.newTaskPriority = 'NORMAL';
      });
    }
  }

  claim(id: number) {
    this.taskService.claimTask(id).subscribe();
  }

  complete(id: number) {
    this.taskService.completeTask(id).subscribe();
  }

  isMyTask(task: any): boolean {
    return task.user?.username === this.currentUser?.username;
  }
}
