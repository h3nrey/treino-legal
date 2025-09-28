import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Exercise } from '../../utils/interfaces';

@Component({
  selector: 'selectedExerciseCard',
  imports: [],
  templateUrl: './selected-exercise-card.component.html',
  styleUrl: './selected-exercise-card.component.scss',
})
export class SelectedExerciseCardComponent {
  @Input() exercise!: Exercise;
  @Output() onRemoveExercise = new EventEmitter();
  PLACEHOLDERIMAGE = 'assets/DefaultBGCard.svg';
  closeIcon = 'assets/icons/whiteClose.svg';

  removeExercise() {
    this.onRemoveExercise.emit(this.exercise);
  }
}
