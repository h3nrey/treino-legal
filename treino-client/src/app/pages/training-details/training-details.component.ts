import { Component, OnInit } from '@angular/core';
import { Training } from '../../utils/interfaces';
import { TrainingService } from '../../services/training.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DetailsRowComponent } from '../../components/details-row/details-row.component';
import { CommonModule, NgClass } from '@angular/common';
import { ExericiseDetails } from '../exercise-details/exercise-details.component';

@Component({
  selector: 'app-training-details',
  imports: [RouterLink, DetailsRowComponent, CommonModule, NgClass],
  templateUrl: './training-details.component.html',
  styleUrl: './training-details.component.scss',
})
export class TrainingDetailsComponent implements OnInit {
  training!: Training;
  relatedTrainings: Training[] = [];
  currentExercise = 0;
  PLACEHOLDERIMAGE = 'assets/DefaultBGCard.svg';

  constructor(
    private trainingService: TrainingService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (!id) return;

      this.loadTrainingData(id);
      this.loadRelatedTrainings(id);
    });
  }

  selectExercise(index: number) {
    this.currentExercise = index;
  }

  loadTrainingData(id: string) {
    this.trainingService.getTraining(id).subscribe((res) => {
      console.log(res);
      this.training = res;
    });
  }

  loadRelatedTrainings(id: string) {
    this.trainingService.getRelatedTrainings(`${id}`).subscribe((res) => {
      console.log(res);
      this.relatedTrainings = res;
    });
  }
}
