import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export interface UserRank {
  id: number;
  username: string;
  score: number;
}

export interface UserData {
  id: number;
  username: string;
  score: number;
  role: string;
}

export interface Redemption {
  id: number;
  rewardTitle: string;
  pointsCost: number;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users';
  
  ranking = signal<UserRank[]>([]);
  userData = signal<UserData | null>(null);
  redemptions = signal<Redemption[]>([]);

  constructor(private http: HttpClient) {}

  loadRanking() {
    return this.http.get<UserRank[]>(`${this.apiUrl}/ranking`).pipe(
      tap(data => this.ranking.set(data))
    );
  }

  loadMe() {
    return this.http.get<UserData>(`${this.apiUrl}/me`).pipe(
      tap(data => this.userData.set(data))
    );
  }

  loadRedemptions() {
    return this.http.get<Redemption[]>(`${this.apiUrl}/redemptions`).pipe(
      tap(data => this.redemptions.set(data))
    );
  }

  redeem(points: number, rewardTitle: string) {
    return this.http.post<UserData>(`${this.apiUrl}/redeem`, { points, rewardTitle }).pipe(
      tap(data => {
        this.userData.set(data);
        this.loadRedemptions().subscribe();
      })
    );
  }
}
