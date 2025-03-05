import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExercisesService } from '../../services/exercises.service';
import { Exercise } from '../../utils/interfaces';
import { ExerciseCardComponent } from '../../components/exercise-card/exercise-card.component';
import { SidebarService } from '../../services/sidebar.service';
import { CommonModule, NgClass } from '@angular/common';
import { PaginatorComponent } from "../../components/paginator/paginator.component";

@Component({
  selector: 'app-search',
  imports: [ExerciseCardComponent, CommonModule, NgClass, PaginatorComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit{
  constructor(private route: ActivatedRoute, private exerciseService: ExercisesService, protected sidebarService: SidebarService){}
  searchTerm: string = ''
  exercises: Exercise[] = [];
  page = 0;
  itemsPerPage = 16;
  totalCount = 0;


  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.searchTerm = params.get("keyword") as string
      this.page = Number(params.get("page"))
      this.loadExercises();
    })
  }

  loadExercises() {
    const params = {
      page: this.page,
      count: this.itemsPerPage,
      search: this.searchTerm
    }
    this.exerciseService.getExercises(params).subscribe(exercises => {
      console.log(exercises)
      this.exercises = exercises.data;
      this.totalCount = exercises.totalCount;
    })
  }
}
