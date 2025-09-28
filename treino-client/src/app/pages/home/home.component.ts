import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Equipament, Exercise, Muscle, Training, User } from '../../utils/interfaces';
import { ExerciseCardComponent } from '../../components/exercise-card/exercise-card.component';
import { ExercisesService } from '../../services/exercises.service';
import { MuscleCardComponent } from '../../components/cards/muscle-card/muscle-card.component';
import { SidebarService } from '../../services/sidebar.service';
import { CommonModule, NgClass } from '@angular/common';
import { BannerComponent } from '../../components/home/banner/banner.component';
import { HomeSectionComponent } from '../../components/home-section/home-section.component';
import { UserService } from '../../services/users.service.ts.service';
import { TrainingService } from '../../services/training.service';
import { TrainingCardComponent } from '../../components/training-card/training-card.component';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    ExerciseCardComponent,
    MuscleCardComponent,
    NgClass,
    CommonModule,
    BannerComponent,
    HomeSectionComponent,
    TrainingCardComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, AfterViewInit {
  constructor(
    private exerciseService: ExercisesService,
    private trainingService: TrainingService,
    protected sidebarService: SidebarService,
    private userService: UserService
  ) {}
  title = 'treino-client';
  bannerClosed = false;
  popularExercises: Exercise[] = [];
  popularTrainings: Training[] = [];
  muscles: Muscle[] = [];
  equipaments: Equipament[] = [];
  arrowRight = 'assets/icons/arrowRight.svg';
  user: User | null = null;

  ngOnInit() {
    this.userService.currentUser.subscribe({
      next: (user) => {
        this.user = user;
      },
    });
    this.checkBannerStatus();
  }

  ngAfterViewInit() {
    this.popularExercises = [];

    const params = {
      sort_by: 'popularity',
      page: 0,
      count: 5,
      userId: this.user?.id,
    };
    this.exerciseService.getExercises(params).subscribe({
      next: (res) => {
        this.popularExercises = res.data;
      },
    });
    this.trainingService
      .getPopularTrainings({ sortBy: 'popularity', page: 0, count: 5 })
      .subscribe({
        next: (res) => {
          this.popularTrainings = res.data;
        },
      });
  }

  checkBannerStatus() {
    this.bannerClosed = localStorage.getItem('home__banner__closed') === 'true';
  }
}
