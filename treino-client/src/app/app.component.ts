import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { BannerComponent } from "./components/home/banner/banner.component";
import { HomeHeaderComponent } from "./components/home/header/header.component";
import { Exercise } from './utils/interfaces';
import { ExerciseCardComponent } from './components/exercise-card/exercise-card.component';
import { ExercisesService } from './services/exercises.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent, BannerComponent, HomeHeaderComponent, ExerciseCardComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(private exerciseService: ExercisesService) { }
  title = 'treino-client';
  bannerClosed = false;
  popularExercises: Exercise[] = [];

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
