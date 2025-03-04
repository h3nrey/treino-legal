import { Component, OnInit } from '@angular/core';
import { ExerciseReponse, ExercisesService } from '../../services/exercises.service';
import { Exercise } from '../../utils/interfaces';
import { ExerciseCardComponent } from '../../components/exercise-card/exercise-card.component';
import { ActivatedRoute, Router } from '@angular/router';
import { NgStyle } from '@angular/common';
import { PaginatorComponent } from '../../components/paginator/paginator.component';

@Component({
  selector: 'app-exercise-section',
  imports: [ExerciseCardComponent, NgStyle, PaginatorComponent],
  templateUrl: './exercise-section.component.html',
  styleUrl: './exercise-section.component.scss'
})
export class ExerciseSectionComponent implements OnInit {
  constructor(
    private readonly exerciseService: ExercisesService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) { }

  exercises: Exercise[] = []
  sectionParams: any
  sectionType: string = '';
  headerData: {
    title: string,
    description: string,
    imgUrl?: string
  } = { title: '', description: '' }
  defaultImgUrl = 'https://moyerwellness.com/wp-content/uploads/2024/01/BH-Biceps-1-1024x576.jpg'
  itemsPerPage = 16;
  page = 0;
  totalCount = 0;

  ngOnInit() {
    this.getParams();
  }

  getParams() {
    this.route.queryParams.subscribe(param => {
      this.sectionParams = { ...param, count: this.itemsPerPage }
      this.page = param['page']
      this.sectionType = this.route.snapshot.url[2].path
      this.loadHeaderData();
      this.loadExercises();
    })
  }

  loadHeaderData() {
    console.log("header data")
    console.log(this.sectionType)
    if (this.sectionType == 'equipament') {
      this.exerciseService.getEquipaments(this.sectionParams.equipament).subscribe(equipament => {
        this.headerData = {
          title: equipament[0].name,
          description: equipament[0].description ?? '',
        }
      })
    } else if (this.sectionType == 'muscle-group') {
      console.log("haha")
      this.exerciseService.getMuscle(this.sectionParams.muscle).subscribe(muscle => {
        console.log(muscle)
        this.headerData = {
          title: muscle.name,
          description: muscle.description ?? '',
        }
      })
    }
  }

  loadExercises() {
    this.exerciseService.getExercises(this.sectionParams).subscribe((exercises: ExerciseReponse) => {
      this.exercises = exercises.data;
      this.totalCount = exercises.totalCount;
    })
  }

}
