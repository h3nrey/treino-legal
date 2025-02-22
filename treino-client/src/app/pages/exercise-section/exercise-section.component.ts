import { Component } from '@angular/core';
import { ExercisesService } from '../../services/exercises.service';
import { Exercise } from '../../utils/interfaces';
import { ExerciseCardComponent } from '../../components/exercise-card/exercise-card.component';

@Component({
  selector: 'app-exercise-section',
  imports: [ExerciseCardComponent],
  templateUrl: './exercise-section.component.html',
  styleUrl: './exercise-section.component.scss'
})
export class ExerciseSectionComponent {
  constructor(private exerciseService: ExercisesService) { }
  exercises: Exercise[] = []
  ngOnInit() {
    this.exerciseService.getPopularExercises().subscribe((exercises: Exercise[]) => {
      this.exercises = exercises;
    })
  }

}
