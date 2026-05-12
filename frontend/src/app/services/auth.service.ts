import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export interface AuthResponse {
  access_token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';
  
  // Usando Angular Signals para reatividade
  currentUser = signal<{ id: number, username: string, role?: string } | null>(null);

  constructor(private http: HttpClient) {
    this.checkToken();
  }

  private parseJwt(token: string) {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  }

  private checkToken() {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = this.parseJwt(token);
      if (decoded && decoded.username) {
        this.currentUser.set({ id: decoded.sub, username: decoded.username, role: decoded.role });
      } else {
        this.logout();
      }
    }
  }

  login(credentials: any) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(res => {
        localStorage.setItem('token', res.access_token);
        const decoded = this.parseJwt(res.access_token);
        this.currentUser.set({ id: decoded?.sub, username: decoded?.username || credentials.username, role: decoded?.role });
      })
    );
  }

  register(credentials: any) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, credentials).pipe(
      tap(res => {
        localStorage.setItem('token', res.access_token);
        const decoded = this.parseJwt(res.access_token);
        this.currentUser.set({ id: decoded?.sub, username: decoded?.username || credentials.username, role: decoded?.role });
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUser.set(null);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
