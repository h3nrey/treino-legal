import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Exercise } from '../../utils/interfaces';
import { ExerciseCardComponent } from '../../components/exercise-card/exercise-card.component';
import { ExercisesService } from '../../services/exercises.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink, ExerciseCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private exerciseService: ExercisesService) { }
    title = 'treino-client';
    bannerClosed = false;
  popularExercises: Exercise[] = [];
  arrowRight = "assets/icons/arrowRight.svg"

  ngOnInit() {
    this.checkBannerStatus();

    this.exerciseService.getPopularExercises().subscribe({
      next: (res) => {
        this.popularExercises = res
      }
    })

  }

  checkBannerStatus() {
    this.bannerClosed = localStorage.getItem('home__banner__closed') === 'true';
  }
}
