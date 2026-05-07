import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export interface UserRank {
  id: number;
  username: string;
  score: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users';
  
  ranking = signal<UserRank[]>([]);

  constructor(private http: HttpClient) {}

  loadRanking() {
    return this.http.get<UserRank[]>(`${this.apiUrl}/ranking`).pipe(
      tap(data => this.ranking.set(data))
    );
  }
}
