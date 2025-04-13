import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Equipament, Exercise, Muscle, User } from '../../utils/interfaces';
import { ExerciseCardComponent } from '../../components/exercise-card/exercise-card.component';
import { ExercisesService } from '../../services/exercises.service';
import { MuscleCardComponent } from '../../components/cards/muscle-card/muscle-card.component';
import { SidebarService } from '../../services/sidebar.service';
import { CommonModule, NgClass } from '@angular/common';
import { BannerComponent } from '../../components/home/banner/banner.component';
import { HomeSectionComponent } from "../../components/home-section/home-section.component";
import { UserService } from '../../services/users.service.ts.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink, ExerciseCardComponent, MuscleCardComponent, NgClass, CommonModule, BannerComponent, HomeSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, AfterViewInit {
  constructor(
    private exerciseService: ExercisesService, 
    protected sidebarService: SidebarService, 
    private userService: UserService
  ) { }
  title = 'treino-client';
  bannerClosed = false;
  popularExercises: Exercise[] = [];
  muscles: Muscle[] = [];
  equipaments: Equipament[] = [];
  arrowRight = "assets/icons/arrowRight.svg"
  user: User | null = null;

  ngOnInit() {
    this.userService.currentUser.subscribe({
      next: (user) => { 
        this.user = user;
      }
    });
    this.checkBannerStatus();
  }

  ngAfterViewInit() {
    this.popularExercises = []

    const params = {
      sortBy: 'popularity',
      page: 0,
      count: 6,
      userId: this.user?.id,
    }
    this.exerciseService.getExercises(params).subscribe({
      next: (res) => {
        this.popularExercises = res.data
      }
    })
  }

  checkBannerStatus() {
    this.bannerClosed = localStorage.getItem('home__banner__closed') === 'true';
  }
}
