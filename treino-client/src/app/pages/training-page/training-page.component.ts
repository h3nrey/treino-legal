import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CarrousselCardComponent } from '../../components/carroussel-card/carroussel-card.component';
import { TrainingService } from '../../services/training.service';
import { Training } from '../../utils/interfaces';

@Component({
  selector: 'app-training-page',
  imports: [CarrousselCardComponent],
  templateUrl: './training-page.component.html',
  styleUrl: './training-page.component.scss'
})
export class TrainingPageComponent implements OnInit{
  constructor(private trainingService: TrainingService){}
  trainings = [
    {
      title: "Treino super pesado legal",
      duration: 80,
      type: "strength",
      description: "lorem impsu solor dolet blá blá",
      id: 1
    },
    {
      title: "Treino super pesado legal",
      duration: 80,
      type: "strength",
      description: "lorem impsu solor dolet blá blá",
      id: 1
    },
    {
      title: "Treino super pesado legal",
      duration: 80,
      type: "strength",
      description: "lorem impsu solor dolet blá blá",
      id: 1
    },
    {
      title: "Treino super pesado legal",
      duration: 80,
      type: "strength",
      description: "lorem impsu solor dolet blá blá",
      id: 1
    },
    {
      title: "Treino super pesado legal",
      duration: 80,
      type: "strength",
      description: "lorem impsu solor dolet blá blá",
      id: 1
    }
  ]
  popularTrainings: Training[] = [];


  ngOnInit(): void {
    this.trainingService.getPopularTrainings({count: 3, sortBy: 'popularity'}).subscribe((res) => {
      this.popularTrainings = res.data;
    });
  }
}
