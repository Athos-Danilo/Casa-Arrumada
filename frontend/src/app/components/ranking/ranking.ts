import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ranking.html',
  styleUrl: './ranking.css'
})
export class RankingComponent implements OnInit {
  userService = inject(UserService);

  ngOnInit() {
    this.userService.loadRanking().subscribe();
  }
}
