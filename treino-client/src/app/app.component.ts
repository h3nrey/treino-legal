import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { BannerComponent } from "./components/home/banner/banner.component";
import { HomeHeaderComponent } from "./components/home/header/header.component";
import { Exercise } from './utils/interfaces';
import { ExerciseCardComponent } from './components/exercise-card/exercise-card.component';
import { ExercisesService } from './services/exercises.service';
import { SnackComponent } from "./components/snack/snack.component";
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroUsers } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent, BannerComponent, HomeHeaderComponent, ExerciseCardComponent, RouterLink, SnackComponent, NgIcon],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor() { }
  title = 'treino-client';
  bannerClosed = false;
  popularExercises: Exercise[] = [];

  ngOnInit() {
    this.checkBannerStatus();

  }

  checkBannerStatus() {
    // this.bannerClosed = localStorage.getItem('home__banner__closed') === 'true';
  }
}
