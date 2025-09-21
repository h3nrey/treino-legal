import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExercisesService } from '../../services/exercises.service';
import { ExerciseCardComponent } from '../../components/exercise-card/exercise-card.component';

@Component({
  selector: 'app-list-exercises',
  imports: [ExerciseCardComponent],
  templateUrl: './list-exercises.component.html',
  styleUrl: './list-exercises.component.scss',
})
export class ListExercisesComponent {
  constructor(
    private route: ActivatedRoute,
    private exercisesService: ExercisesService
  ) {}

  muscleGroupId: string | null = null;
  exercises: any[] = [];

  ngOnInit(): void {
    this.muscleGroupId = this.route.snapshot.paramMap.get('musclegroup');
    this.loadExercises();
  }

  async loadExercises() {
    if (!this.muscleGroupId) return;
    this.exercises = await this.exercisesService.listMusclesByMuscleGroup(this.muscleGroupId);
  }
}
