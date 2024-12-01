import { Component, OnInit } from '@angular/core';
import { Exercise } from '../../utils/interfaces';
import { ActivatedRoute } from '@angular/router';
import { ExercisesService } from '../../services/exercises.service';

@Component({
  selector: 'app-exercise-details',
  imports: [],
  templateUrl: './exercise-details.component.html',
  styleUrl: './exercise-details.component.scss'
})
export class ExerciseDetailsComponent implements OnInit {
  exerciseData: Exercise | null = null;

  constructor(private exerciseService: ExercisesService, private route: ActivatedRoute) { }
  ngOnInit() {
    const exerciseId = this.route.snapshot.paramMap.get('exercise');

    if (exerciseId)
      this.exerciseService.getExerciseById(exerciseId)
        .subscribe(data => {
          this.exerciseData = data;
        });
  }
}
