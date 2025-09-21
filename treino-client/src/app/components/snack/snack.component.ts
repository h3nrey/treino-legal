import { Component } from '@angular/core';
import { SnackMessage, SnackService } from '../../services/snack.service';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-snack',
  imports: [CommonModule],
  templateUrl: './snack.component.html',
  styleUrl: './snack.component.scss',
  animations: [
    trigger('snackAnimation', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateX(-50%)',
        }),
        animate(
          '300ms ease-out',
          style({
            opacity: 1,
            transform: 'translateX(0)',
          })
        ),
      ]),
      transition(':leave', [
        animate(
          '300ms ease-in',
          style({
            opacity: 0,
            transform: 'translateX(50%)',
          })
        ),
      ]),
    ]),
  ],
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
