import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  points?: number;
  timeLimit?: number;
  user: { id: number, username: string } | null;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/tasks';
  
  tasks = signal<Task[]>([]);
  history = signal<Task[]>([]);

  constructor(private http: HttpClient) {}

  loadTasks() {
    return this.http.get<Task[]>(this.apiUrl).pipe(
      tap(data => this.tasks.set(data))
    );
  }

  loadHistory() {
    return this.http.get<Task[]>(`${this.apiUrl}/history`).pipe(
      tap(data => this.history.set(data))
    );
  }

  createTask(task: { title: string, description: string, priority: string, points?: number, timeLimit?: number | null }) {
    return this.http.post<Task>(this.apiUrl, task).pipe(
      tap(() => this.loadTasks().subscribe())
    );
  }

  claimTask(id: number) {
    return this.http.patch<Task>(`${this.apiUrl}/${id}/claim`, {}).pipe(
      tap(() => this.loadTasks().subscribe())
    );
  }

  completeTask(id: number) {
    return this.http.patch<Task>(`${this.apiUrl}/${id}/complete`, {}).pipe(
      tap(() => this.loadTasks().subscribe())
    );
  }

  deleteTask(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.loadTasks().subscribe())
    );
  }
}
