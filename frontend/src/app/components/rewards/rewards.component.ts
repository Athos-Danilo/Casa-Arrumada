import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-rewards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rewards.component.html',
  styleUrl: './rewards.component.css'
})
export class RewardsComponent implements OnInit {
  userService = inject(UserService);

  rewards = [
    { id: 1, title: 'Sorvete no Final de Semana', points: 50, icon: '🍦' },
    { id: 2, title: 'Folga da Louça', points: 100, icon: '🍽️' },
    { id: 3, title: '1 Hora a mais de Videogame', points: 150, icon: '🎮' },
    { id: 4, title: 'Escolher o Filme da Noite', points: 200, icon: '🎬' },
    { id: 5, title: 'Pizza do Sabor Favorito', points: 300, icon: '🍕' }
  ];

  get userData() {
    return this.userService.userData();
  }

  get redemptions() {
    return this.userService.redemptions();
  }

  ngOnInit() {
    this.userService.loadMe().subscribe();
    this.userService.loadRedemptions().subscribe();
  }

  redeem(points: number, title: string) {
    if (this.userData && this.userData.score >= points) {
      if (confirm(`Deseja gastar ${points} pts para resgatar "${title}"?`)) {
        this.userService.redeem(points, title).subscribe({
          next: () => alert(`Parabéns! Você resgatou "${title}"!`),
          error: (err) => alert('Erro ao resgatar: ' + err.message)
        });
      }
    } else {
      alert('Pontos insuficientes!');
    }
  }
}
