import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExerciseParams, ExercisesService } from '../../services/exercises.service';
import { Exercise } from '../../utils/interfaces';
import { ExerciseCardComponent } from '../../components/exercise-card/exercise-card.component';
import { SidebarService } from '../../services/sidebar.service';
import { CommonModule, NgClass } from '@angular/common';
import { PaginatorComponent } from "../../components/paginator/paginator.component";
import { SelectComponent } from "../../components/select/select.component";
import { SearchService } from '../../services/search.service';

interface ExerciseSearchParams {
  page: number;
  count: number;
  muscle: string;
  equipament: string;
  search: string;
}
@Component({
  selector: 'app-search',
  imports: [ExerciseCardComponent, CommonModule, NgClass, PaginatorComponent, SelectComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit{
  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute, 
    private readonly exerciseService: ExercisesService, 
    protected sidebarService: SidebarService,
    private readonly searchService: SearchService
  ){}
  searchTerm: string = ''
  exercises: Exercise[] = [];
  totalCount = 0;
  filters: {muscle: string, equipament: string} = {muscle: '', equipament: ''}
  defaultParams: ExerciseSearchParams = { page: 0, count: 16, muscle: '', equipament: '', search: '' };
  params: ExerciseSearchParams = this.defaultParams;
  closeIcon = 'assets/icons/close.svg'
  muscles: string[] = []
  equipaments: string[] = []

  ngOnInit() {
    this.getFilters();

    this.route.queryParamMap.subscribe(params => {
      this.params = {
      ...this.defaultParams,
      page: +(params.get("page") ?? 0),
      muscle: params.get("muscle") ?? '',
      equipament: params.get("equipament") ?? '',
      search: params.get("keyword") ?? ''
    };

      this.filters = { muscle: this.params.muscle, equipament: this.params.equipament };
      this.loadExercises();
    })
  }

  getFilters() {
    this.exerciseService.getMuscles().subscribe(muscles => {
      this.muscles = muscles.map(muscle => muscle.name);
    })
    this.exerciseService.getEquipaments().subscribe(equipaments => {
      this.equipaments = equipaments.map(equipament => equipament.name)
    })
  }

  updateFilters(updated: Partial<ExerciseParams>) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: updated,
      queryParamsHandling: 'merge',
      replaceUrl: true
    })
  }

  clearFilters() {
    this.searchService.emitClearFilters()
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {keyword: ""},
      queryParamsHandling: 'replace',
      replaceUrl: true
    })
  }

  loadExercises() {
    this.params['search'] = this.searchTerm;
    this.exerciseService.getExercises(this.params).subscribe(res => {
      this.exercises = res.data;
      this.totalCount = res.pagination.totalCount;
    })
  }
}
