import { Component, OnInit } from '@angular/core';
import { Training } from '../../utils/interfaces';
import { TrainingService } from '../../services/training.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DetailsRowComponent } from "../../components/details-row/details-row.component";

@Component({
  selector: 'app-training-details',
  imports: [RouterLink, DetailsRowComponent],
  templateUrl: './training-details.component.html',
  styleUrl: './training-details.component.scss'
})
export class TrainingDetailsComponent implements OnInit{
  training!: Training;
  relatedTrainings: Training[] = [];

  constructor(
    private trainingService: TrainingService,
    private route: ActivatedRoute
  ){}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get("id");
      if(!id) return;

      this.loadTrainingData(id);
    })
    this.loadRelatedTrainings();
  }

  loadTrainingData(id: string) {
    this.trainingService.getTraining(id).subscribe(res => {
      this.training = res;
    }) 
  }

  loadRelatedTrainings() {
    this.trainingService.getPopularTrainings({page: 0, count: 10}).subscribe(res => {
      this.relatedTrainings = res.data;
    })
  }
}
