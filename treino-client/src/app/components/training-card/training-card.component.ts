import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { Training } from '../../utils/interfaces';
import { SnackService } from '../../services/snack.service';
import { TrainingService } from '../../services/training.service';

interface CardTraining extends Training {
  favorited?: boolean;
}

@Component({
  selector: 'TrainingCard',
  imports: [],
  templateUrl: './training-card.component.html',
  styleUrl: './training-card.component.scss',
})
export class TrainingCardComponent {
  @Input() training!: CardTraining;
  @Output() unfavoriteEv = new EventEmitter<void>();

  PLACEHOLDERIMAGE = 'assets/DefaultBGCard.svg';
  showLoginPopup: boolean = false;

  constructor(
    private snackService: SnackService,
    private trainingService: TrainingService
  ) {}

  toggleFavorite(e: MouseEvent) {
    if (!this.training) return;
    e.stopPropagation();
    e.preventDefault();

    this.snackService.show(
      this.training.favorited ? 'Removido dos favoritos' : 'Adicionado aos favoritos',
      this.training.favorited ? 'error' : 'success'
    );
    if (this.training.favorited) {
      this.trainingService.unFavoritetraining(this.training.id).subscribe({
        next: (res) => {
          if (!this.training) return;
          this.training.favorited = false;
          this.unfavoriteEv.emit();
        },
      });
    } else {
      this.trainingService.favoritetraining(this.training.id).subscribe({
        next: (res) => {
          if (!res) {
            this.showLoginPopup = true;
            return;
          }
          if (!this.training) return;
          this.training.favorited = true;
        },
      });
    }
  }
}
