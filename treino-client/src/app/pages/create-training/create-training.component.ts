import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Exercise } from '../../utils/interfaces';
import { Option, SelectComponent } from '../../components/select/select.component';
import { goals } from '../../../data';
import { ExercisesService } from '../../services/exercises.service';
import { TrainingExerciseSearcherComponent } from '../../components/create-training/training-exercise-searcher/training-exercise-searcher.component';
import { TrainingService } from '../../services/training.service';
import { SelectedExerciseCardComponent } from '../../components/selected-exercise-card/selected-exercise-card.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { chooseIcon } from '../../utils/chooseIcon';

@Component({
  selector: 'app-create-training',
  imports: [
    ReactiveFormsModule,
    SelectComponent,
    TrainingExerciseSearcherComponent,
    SelectedExerciseCardComponent,
  ],
  templateUrl: './create-training.component.html',
  styleUrl: './create-training.component.scss',
})
export class CreateTrainingComponent implements OnInit {
  experienceLevelOptions: Option[] = [
    { value: 'BEGGINER', label: 'Iniciante' },
    { value: 'INTERMEDIARY', label: 'Intermediário' },
  ];
  goalsOptions = goals;
  trainingForm!: FormGroup;
  search = new FormControl('');
  selectedExercises: Exercise[] = [];
  closeIcon = 'assets/icons/close.svg';
  arrowIcon = chooseIcon('arrowDownRed');

  constructor(
    private fb: FormBuilder,
    private trainingService: TrainingService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.trainingForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      duration: [0, Validators.required],
      experienceLevel: ['', Validators.required],
      goal: ['', Validators.required],
      thumbnailUrl: ['', Validators.required],
      exercises: [[], Validators.required],
    });
  }

  closeForm() {
    this.location.back();
  }

  selectExercise(exercise: Exercise) {
    console.log('adding exercise', exercise);
    if (!this.selectedExercises.map((e) => e.id).includes(exercise.id))
      this.selectedExercises.push(exercise);
    this.trainingForm.patchValue({ exercises: this.selectedExercises });
    console.log('training form', this.trainingForm.value);
  }

  removeExercise(exercise: Exercise) {
    this.selectedExercises = this.selectedExercises.filter((e) => e.id != exercise.id);
  }

  changeTrainingFormKey(key: string, value: string | number) {
    this.trainingForm.get(key)?.setValue(value);
    console.log(this.trainingForm.value);
  }

  saveTraining() {
    console.log(this.trainingForm.value);

    if (this.trainingForm.valid) {
      const training = {
        duration: 300,
        ...this.trainingForm.value,
        exercises: this.selectedExercises,
      };
      this.trainingService.createTraininig(training).subscribe();
      console.log('Treino salvo:', training);
    } else {
      this.trainingForm.markAllAsTouched();
    }
  }
}
