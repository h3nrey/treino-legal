import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Exercise } from '../../../utils/interfaces';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ExercisesService } from '../../../services/exercises.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'TrainingExerciseSearcher',
  imports: [ReactiveFormsModule],
  templateUrl: './training-exercise-searcher.component.html',
  styleUrl: './training-exercise-searcher.component.scss',
})
export class TrainingExerciseSearcherComponent {
  search = new FormControl('');
  exercises: Exercise[] = [];
  loadinig = false;
  @Output() onSelectExercise = new EventEmitter<Exercise>();
  @Input() selectedExercises: Exercise[] = [];
  PLACEHOLDERIMAGE = 'assets/DefaultBGCard.svg';

  constructor(
    private exerciseService: ExercisesService,
    private elRef: ElementRef
  ) {}

  ngOnInit() {
    this.handleExerciseSearch();
  }

  selectExercise(exercise: Exercise) {
    this.onSelectExercise.emit(exercise);
  }

  handleExerciseSearch() {
    this.search.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((searchTerm: any) => this.loadExercises(searchTerm));
  }

  loadExercises(searchTerm: string) {
    this.loadinig = true;
    this.exerciseService
      .getExercises({ search: searchTerm, count: 3 })
      .subscribe((res) => {
        this.exercises = res.data;
      })
      .add(() => (this.loadinig = false));
  }

  @HostListener('document:click', ['$event'])
  closeSelect(event: Event) {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.exercises = [];
    }
  }
}
