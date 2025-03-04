import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Equipament, Exercise, Muscle } from '../../utils/interfaces';
import { ExerciseCardComponent } from '../../components/exercise-card/exercise-card.component';
import { ExercisesService } from '../../services/exercises.service';
import { MuscleCardComponent } from '../../components/cards/muscle-card/muscle-card.component';

@Component({
  selector: 'app-home',
  imports: [RouterLink, ExerciseCardComponent, MuscleCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private exerciseService: ExercisesService) { }
  title = 'treino-client';
  bannerClosed = false;
  popularExercises: Exercise[] = [];
  muscles: Muscle[] = [];
  equipaments: Equipament[] = [];
  arrowRight = "assets/icons/arrowRight.svg"

  ngOnInit() {
    this.checkBannerStatus();

    this.exerciseService.getPopularExercises().subscribe({
      next: (res) => {
        console.log("popular exercises")
        console.log(res)
        this.popularExercises = res
      }
    })

    this.exerciseService.getMuscles().subscribe({
      next: (res) => {
        this.muscles = res;
        console.log(res)
      }
    });

    this.exerciseService.getEquipaments().subscribe({
      next: (res) => {
        this.equipaments = res;
        console.log(res)
      }
    });

  }

  checkBannerStatus() {
    this.bannerClosed = localStorage.getItem('home__banner__closed') === 'true';
  }
}
