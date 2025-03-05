import { Component, OnInit } from '@angular/core';
import { Exercise } from '../../utils/interfaces';
import { ActivatedRoute } from '@angular/router';
import { ExercisesService } from '../../services/exercises.service';
import { InfoWrapperComponent } from '../../components/execise-details/info-wrapper/info-wrapper.component';

interface ExericiseDetails extends Exercise {
  primaryMuscle: string,
  otherMuscles: string[],
  grip: string,
  equipament: string,
  experienceLevel: string,
  instructions: { step: number, description: string }[]
  tips: { description: string }[]
}

export interface exerciseMuscle {
  name: string,
  isPrimary: boolean
}

@Component({
  selector: 'app-exercise-details',
  imports: [InfoWrapperComponent],
  templateUrl: './exercise-details.component.html',
  styleUrl: './exercise-details.component.scss'
})
export class ExerciseDetailsComponent implements OnInit {
  exerciseData: ExericiseDetails | null = null;

  constructor(private exerciseService: ExercisesService, private route: ActivatedRoute) { }
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const exerciseId = params.get("exercise");
      console.log(exerciseId)
      if(exerciseId) {
        this.loadExercises(exerciseId);
      }
    })

  }

  loadExercises(exerciseId: string) {
    this.exerciseService.getExerciseById(exerciseId)
        .subscribe(data => {
          console.log(data)
          this.exerciseData = {
            ...data,
            grip: data.grip.name,
            equipament: data.equipament.name,
            experienceLevel: data.experienceLevel.name,
            instructions: data.ExerciseInstruction,
            tips: data.ExerciseTips,
            primaryMuscle: data.usedMuscles.filter((muscle: exerciseMuscle) => muscle.isPrimary)[0].name,
            otherMuscles: data.usedMuscles.filter((muscle: exerciseMuscle) => !muscle.isPrimary).map((muscle: exerciseMuscle) => muscle.name),
          };
        });
  }
}
