import { Component } from '@angular/core';
import { SnackMessage, SnackService } from '../../services/snack.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-snack',
  imports: [CommonModule],
  templateUrl: './snack.component.html',
  styleUrl: './snack.component.scss'
})
export class SnackComponent {
  snack: SnackMessage | null = null;

  constructor(private snackService: SnackService) {}

  ngOnInit() {
    this.snackService.snack$.subscribe((msg) => {
      this.snack = msg;
    });
  }
}
