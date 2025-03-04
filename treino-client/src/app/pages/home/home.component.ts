import { AfterViewInit, Component, OnInit } from '@angular/core';
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
export class HomeComponent implements OnInit, AfterViewInit {
  constructor(private exerciseService: ExercisesService) { }
  title = 'treino-client';
  bannerClosed = false;
  popularExercises: Exercise[] = [];
  muscles: Muscle[] = [];
  equipaments: Equipament[] = [];
  arrowRight = "assets/icons/arrowRight.svg"

  ngOnInit() {
    this.checkBannerStatus();



  }

  ngAfterViewInit() {
    this.exerciseService.getPopularExercises().subscribe({
      next: (res) => {
        this.popularExercises = res
      }
    })

    this.exerciseService.getMuscles().subscribe({
      next: (res) => {
        this.muscles = res;
      }
    });

    this.exerciseService.getEquipaments().subscribe({
      next: (res) => {
        this.equipaments = res;
      }
    });
  }

  checkBannerStatus() {
    this.bannerClosed = localStorage.getItem('home__banner__closed') === 'true';
  }
}
