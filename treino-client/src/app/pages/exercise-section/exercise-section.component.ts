import { Component, OnInit } from '@angular/core';
import { ExercisesService } from '../../services/exercises.service';
import { Exercise, ExerciseResponse } from '../../utils/interfaces';
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
    techinicalName: string,
    description: string,
    motorAction: string,
    synergistsMuscles: string,
    antagonistsMuscles: string
    imgUrl?: string
  } = { title: '', techinicalName: '', description: '', motorAction: '',synergistsMuscles: '',antagonistsMuscles: '',  }
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
    if (this.sectionType == 'equipament') {
      // this.exerciseService.getEquipaments(this.sectionParams.equipament).subscribe(equipament => {
      //   this.headerData = {
      //     title: equipament[0].name,
      //     description: equipament[0].description ?? '',
      //   }
      // })
    } else if (this.sectionType == 'muscle-group') {
      this.exerciseService.getMuscle(this.sectionParams.muscle).subscribe(muscle => {
        console.log(muscle);
        this.headerData = {
          title: muscle.name,
          techinicalName: muscle.technicalName,
          motorAction:muscle.motorAction,
          synergistsMuscles: muscle.antagonists,
          antagonistsMuscles: muscle.synergists,
          description: muscle.description ?? '',
        }
      })
    }
  }

  loadExercises() {
    this.exerciseService.getExercises(this.sectionParams).subscribe((res: ExerciseResponse) => {
      this.exercises = res.data;
      // this.totalCount = exercises.totalCount;
    })
  }

}
