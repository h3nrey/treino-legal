import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/users.service.ts.service';
import { ExerciseCardComponent } from '../../components/exercise-card/exercise-card.component';
import { Exercise } from '../../utils/interfaces';
import { ExercisesService } from '../../services/exercises.service';

@Component({
  selector: 'app-user-profile',
  imports: [ExerciseCardComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
  user: { username: string; email: string } | null = null;
  favoritedExercises: Exercise[] = [];
  constructor(
    private readonly userService: UserService,
    private readonly exerciseService: ExercisesService
  ) {}

  ngOnInit() {
    const token = this.userService.getToken();
    if (!token) return;
    this.userService.getUserProfile(token).subscribe({
      next: (user) => {
        console.log(user);
        this.user = user;
      },
    });
    this.loadFavoritedExercises();
  }

  loadFavoritedExercises() {
    this.exerciseService.getFavoritedExercises().subscribe({
      next: (data) => {
        this.favoritedExercises = data;
        console.log(this.favoritedExercises);
      },
    });
  }
}
