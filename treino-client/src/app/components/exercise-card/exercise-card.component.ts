import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  input,
  OnInit,
  Output,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Exercise } from '../../utils/interfaces';
import { ExercisesService } from '../../services/exercises.service';
import { UserService } from '../../services/users.service.ts.service';
import { SnackService } from '../../services/snack.service';
import { ImageFallbackDirective } from '../../directives/image-fallback.directive';

interface CardExercise extends Exercise {
  favorited?: boolean;
}
@Component({
  selector: 'exercise-card',
  imports: [RouterLink, ImageFallbackDirective],
  templateUrl: './exercise-card.component.html',
  styleUrl: './exercise-card.component.scss',
})
export class ExerciseCardComponent implements OnInit {
  @Input() exercise?: CardExercise;
  @Output() unfavoriteEv: EventEmitter<void> = new EventEmitter<void>();
  tags: string[] = [];
  PLACEHOLDERIMAGE = 'assets/DefaultBGCard.svg';
  showLoginPopup = false;

  constructor(
    private readonly elRef: ElementRef,
    private readonly exerciseService: ExercisesService,
    private userService: UserService,
    private snackService: SnackService
  ) {}
  ngOnInit() {
    this.extractTags();
  }

  handleImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = this.PLACEHOLDERIMAGE;

    // Optional: prevent infinite loop if placeholder also fails to load
    imgElement.onerror = null;
  }

  extractTags() {
    if (!this.exercise) return;
    this.tags.push(this.exercise?.level);
  }

  toggleFavorite(e: MouseEvent) {
    if (!this.exercise) return;
    e.stopPropagation();
    e.preventDefault();

    this.snackService.show(
      this.exercise.favorited ? 'Removido dos favoritos' : 'Adicionado aos favoritos',
      this.exercise.favorited ? 'error' : 'success'
    );
    if (this.exercise.favorited) {
      this.exerciseService.unFavoriteExercise(this.exercise.id).subscribe({
        next: (res) => {
          if (!this.exercise) return;
          this.exercise.favorited = false;
          this.unfavoriteEv.emit();
        },
      });
    } else {
      this.exerciseService.favoriteExercise(this.exercise.id).subscribe({
        next: (res) => {
          if (!res) {
            this.showLoginPopup = true;
            return;
          }
          if (!this.exercise) return;
          this.exercise.favorited = true;
        },
      });
    }
  }

  @HostListener('document:click', ['$event'])
  closeSelect(event: Event) {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.showLoginPopup = false;
    }
  }
}
