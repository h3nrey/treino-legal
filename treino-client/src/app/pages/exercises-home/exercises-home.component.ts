import { Component } from '@angular/core';
import { ExercisesService } from '../../services/exercises.service';
import { SidebarService } from '../../services/sidebar.service';
import { Equipament, Exercise, Muscle } from '../../utils/interfaces';
import { RouterLink } from '@angular/router';
import { ExerciseCardComponent } from '../../components/exercise-card/exercise-card.component';
import { MuscleCardComponent } from '../../components/cards/muscle-card/muscle-card.component';
import { CommonModule, NgClass } from '@angular/common';
import {
  RecomendedCardComponent,
  RecommendedCardProps,
} from '../../components/recomended-card/recomended-card.component';
import { SummarySectionCardComponent } from '../../components/summary-section-card/summary-section-card.component';

@Component({
  selector: 'app-exercises-home',
  imports: [
    RouterLink,
    ExerciseCardComponent,
    MuscleCardComponent,
    NgClass,
    CommonModule,
    RecomendedCardComponent,
    SummarySectionCardComponent,
  ],
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
  recommendedExercise: RecommendedCardProps | null = null;
  popularExercises: Exercise[] = [];
  muscles: Muscle[] = [];
  equipaments: Equipament[] = [];
  arrowRight = 'assets/icons/arrowRight.svg';

  summaryTitle = 'Exercícios';
  summaryText =
    'Descubra uma coleção completa de exercícios com instruções claras, variações e dicas de execução. Aprenda a fazer cada movimento com segurança e eficiência, e combine-os para montar seus próprios treinos.';

  ngOnInit() {
    this.checkBannerStatus();

    const params = {
      sort_by: 'popularity',
      page: 0,
      count: 1,
    };
    this.exerciseService.getExercises(params).subscribe({
      next: (res) => {
        console.log(res);
        this.popularExercises = res.data;

        this.recommendedExercise = {
          title: res.data[0].name,
          description: res.data[0].description ?? '',
          thumbnailUrl:
            'https://cdn.borainvestir.b3.com.br/2023/06/30145447/atividades-fisicas-e-dinheiro.jpeg',
          url: `/exercises/${res.data[0].id}`,
        };
      },
    });
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
