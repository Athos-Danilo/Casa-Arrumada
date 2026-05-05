import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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
  router = inject(Router);

  newTaskTitle = '';
  newTaskDesc = '';

  get currentUser() {
    return this.authService.currentUser();
  }

  ngOnInit() {
    if (!this.authService.getToken()) {
      this.router.navigate(['/login']);
      return;
    }
    this.taskService.loadTasks().subscribe();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  addTask() {
    if (this.newTaskTitle.trim()) {
      this.taskService.createTask({
        title: this.newTaskTitle,
        description: this.newTaskDesc,
        priority: 'NORMAL' // can be improved later
      }).subscribe(() => {
        this.newTaskTitle = '';
        this.newTaskDesc = '';
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
