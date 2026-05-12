import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RankingComponent } from './components/ranking/ranking';
import { HistoryComponent } from './components/history/history';
import { LandingComponent } from './components/landing/landing';
import { RewardsComponent } from './components/rewards/rewards.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'ranking', component: RankingComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'rewards', component: RewardsComponent },
  { path: '', component: LandingComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];
