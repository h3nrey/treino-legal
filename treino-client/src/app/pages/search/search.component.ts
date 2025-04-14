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

@Component({
  selector: 'app-search',
  imports: [ExerciseCardComponent, CommonModule, NgClass, PaginatorComponent, SelectComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit{
  constructor(
    private router: Router,
    private route: ActivatedRoute, 
    private exerciseService: ExercisesService, 
    protected sidebarService: SidebarService,
    private searchService: SearchService
  ){}
  searchTerm: string = ''
  exercises: Exercise[] = [];
  page = 0;
  itemsPerPage = 16;
  totalCount = 0;
  muscleGroup = '';
  filters: {muscle: string, equipament: string} = {muscle: '', equipament: ''}
  params: ExerciseParams = {page: 0, count: 16, muscle: '', equipament: ''}
  closeIcon = 'assets/icons/close.svg'
  muscles: string[] = []
  equipaments: string[] = []

  ngOnInit() {
    this.getFilters();

    this.route.queryParamMap.subscribe(params => {
      this.searchTerm = params.get("keyword") as string
      this.page = Number(params.get("page"))

      this.params = {
        page: Number(params.get("page")),
        count: 16
      }

      if(params.get('muscle')) this.params['muscle'] = params.get('muscle') ?? ''
      this.filters.muscle = this.params['muscle'] ?? ''
      if(params.get('equipament')) this.params['equipament'] = params.get('equipament') ?? ''
      this.filters.equipament = this.params['equipament'] ?? ''

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

  updateFilters(value: string, key: 'equipament' | 'muscle' = 'muscle') {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {[key]: value},
      queryParamsHandling: 'merge',
      replaceUrl: true
    })
  }

  clearFilters() {
    const {muscle, equipament, ...clearedParams} = this.params
    this.searchService.emitClearFilters()
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: clearedParams,
      queryParamsHandling: 'replace',
      replaceUrl: true
    })
  }

  loadExercises() {
    console.log(this.params);
    this.params['search'] = this.searchTerm;
    this.exerciseService.getExercises(this.params).subscribe(exercises => {
      console.log(exercises)
      this.exercises = exercises.data;
      this.totalCount = exercises.totalCount;
    })
  }
}
