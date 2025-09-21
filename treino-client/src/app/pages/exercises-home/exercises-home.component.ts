import { Component } from '@angular/core';
import { ExercisesService } from '../../services/exercises.service';
import { SidebarService } from '../../services/sidebar.service';
import { Equipament, Exercise, Muscle } from '../../utils/interfaces';
import { RouterLink } from '@angular/router';
import { ExerciseCardComponent } from '../../components/exercise-card/exercise-card.component';
import { MuscleCardComponent } from '../../components/cards/muscle-card/muscle-card.component';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-exercises-home',
  imports: [RouterLink, ExerciseCardComponent, MuscleCardComponent, NgClass, CommonModule],
  templateUrl: './exercises-home.component.html',
  styleUrl: './exercises-home.component.scss',
})
export class ExercisesHomeComponent {
  constructor(
    private exerciseService: ExercisesService,
    protected sidebarService: SidebarService
  ) {}
  title = 'treino-client';
  bannerClosed = false;
  popularExercises: Exercise[] = [];
  muscles: Muscle[] = [];
  equipaments: Equipament[] = [];
  arrowRight = 'assets/icons/arrowRight.svg';

  ngOnInit() {
    this.checkBannerStatus();
  }

  ngAfterViewInit() {
    this.popularExercises = [];
    // this.exerciseService.getPopularExercises().subscribe({
    //   next: (res) => {
    //     this.popularExercises = res
    //   }
    // })

    this.exerciseService.getMuscles().subscribe({
      next: (res) => {
        this.muscles = res;
      },
    });

    this.exerciseService.getEquipaments().subscribe({
      next: (res) => {
        this.equipaments = res;
      },
    });
  }

  checkBannerStatus() {
    this.bannerClosed = localStorage.getItem('home__banner__closed') === 'true';
  }
}
