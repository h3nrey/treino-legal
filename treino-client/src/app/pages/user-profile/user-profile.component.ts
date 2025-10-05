import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/users.service.ts.service';
import { ExerciseCardComponent } from '../../components/exercise-card/exercise-card.component';
import { Exercise, Training } from '../../utils/interfaces';
import { ExercisesService } from '../../services/exercises.service';
import { ActivatedRoute, Params, RouterLink } from '@angular/router';
import { TrainingService } from '../../services/training.service';
import { TrainingCardComponent } from '../../components/training-card/training-card.component';
import { NgClass } from '@angular/common';

interface pageParams extends Params {
  section: string;
}
@Component({
  selector: 'app-user-profile',
  imports: [ExerciseCardComponent, RouterLink, TrainingCardComponent, NgClass],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
  user: { username: string; email: string } | null = null;
  favoritedExercises: Exercise[] = [];
  favoritedTrainings: Training[] = [];
  userIcon = 'assets/icons/userAvatar.svg';
  sections = [
    { text: 'Exercicios', url: 'exercises' },
    { text: 'Treinos', url: 'trainings' },
  ];
  currSection = '';
  constructor(
    private readonly userService: UserService,
    private readonly exerciseService: ExercisesService,
    private readonly trainingService: TrainingService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.userService.getUserProfile().subscribe({
      next: (user) => {
        this.user = user;
      },
    });
    this.route.params.subscribe((params: any) => {
      this.currSection = params?.section;

      this.favoritedExercises = [];
      this.favoritedTrainings = [];
      switch (this.currSection) {
        case 'exercises':
          this.loadFavoritedExercises();
          break;

        case 'trainings':
          this.loadFavoritedTrainings();
          break;

        default:
          this.loadFavoritedExercises();
          break;
      }
    });
  }

  loadFavoritedExercises() {
    this.exerciseService.getFavoritedExercises().subscribe({
      next: (data) => {
        this.favoritedExercises = data;
      },
    });
  }

  loadFavoritedTrainings() {
    this.trainingService.getFavoritedTrainings({ count: 20 }).subscribe({
      next: (data) => {
        this.favoritedTrainings = data;
      },
    });
  }
}
