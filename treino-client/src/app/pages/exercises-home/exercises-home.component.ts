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
import { Option, SelectComponent } from '../../components/select/select.component';
import { OrderBySelectorComponent } from '../../components/order-by-selector/order-by-selector.component';
import { SearchWrapperComponent } from './components/search-wrapper/search-wrapper.component';
import { ExerciseSearchParams } from '../search/search.component';

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
    SelectComponent,
    OrderBySelectorComponent,
    SearchWrapperComponent,
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
  exercises: Exercise[] = [];
  muscles: Muscle[] = [];
  equipaments: Equipament[] = [];

  summaryTitle = 'Exercícios';
  summaryText =
    'Descubra uma coleção completa de exercícios com instruções claras, variações e dicas de execução. Aprenda a fazer cada movimento com segurança e eficiência, e combine-os para montar seus próprios treinos.';

  searchIcon = 'assets/icons/search.svg';
  arrowRight = 'assets/icons/arrowRight.svg';
  defaultParams: ExerciseSearchParams = {
    page: 0,
    count: 16,
    muscle: '',
    equipament: '',
    search: '',
  };

  ngOnInit() {
    this.loadExercises(this.defaultParams);
    this.exerciseService.getExercises({ sortBy: 'createdAt', count: 1 }).subscribe({
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

  updateFilters() {}

  loadExercises(filters: ExerciseSearchParams) {
    this.exerciseService.getExercises(filters).subscribe((res) => {
      console.log(res);
      this.exercises = res.data;
    });
  }
}
