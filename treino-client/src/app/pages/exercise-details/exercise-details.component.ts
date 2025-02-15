import { Component, OnInit } from '@angular/core';
import { Exercise } from '../../utils/interfaces';
import { ActivatedRoute } from '@angular/router';
import { ExercisesService } from '../../services/exercises.service';
import { InfoWrapperComponent } from '../../components/execise-details/info-wrapper/info-wrapper.component';

@Component({
  selector: 'app-exercise-details',
  imports: [InfoWrapperComponent],
  templateUrl: './exercise-details.component.html',
  styleUrl: './exercise-details.component.scss'
})
export class ExerciseDetailsComponent implements OnInit {
  exerciseData: Exercise | null = null;
  info: {
    primaryMuscle: string,
    otherMuscles: string[],
    experienceLevel: string,
    grip: string,
    equipament: string
  } | null  = null;
  constructor(private exerciseService: ExercisesService, private route: ActivatedRoute) { }
  ngOnInit() {
    const exerciseId = this.route.snapshot.paramMap.get('exercise');

    if (exerciseId)
      this.exerciseService.getExerciseById(exerciseId)
        .subscribe(data => {
          console.log(data);
          this.exerciseData = data;
          this.info = {
            primaryMuscle: data.usedMuscles.filter((muscle: any) => muscle.level_type = 'primário')[0].muscle.name,
            otherMuscles: data.usedMuscles.map((muscle: any) => muscle.muscle.name),
            experienceLevel: data.experienceLevel.name,
            grip: data.grip.name,
            equipament: data.equipament.name
          }

          console.log(this.info)
        });
  }
}
