import { Component, EventEmitter, Output } from '@angular/core';
import { Option, SelectComponent } from '../../../../components/select/select.component';
import { ExercisesService } from '../../../../services/exercises.service';
import { chooseIcon } from '../../../../utils/chooseIcon';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ExerciseSearchParams } from '../../../search/search.component';

@Component({
  selector: 'ExerciseSearchWrapper',
  imports: [SelectComponent, ReactiveFormsModule],
  templateUrl: './search-wrapper.component.html',
  styleUrl: './search-wrapper.component.scss',
})
export class SearchWrapperComponent {
  searchTerm = new FormControl('');
  musclesOptions: Option[] = [];
  equipamentsOptions: Option[] = [];
  arrowRight = 'assets/icons/arrowRight.svg';
  searchIcon = 'assets/icons/search.svg';
  arrowIcon = chooseIcon('arrowDownRed');
  filters: ExerciseSearchParams = {
    page: 0,
    count: 16,
    muscle: '',
    equipament: '',
    search: '',
  };
  @Output() onUpdateFilters = new EventEmitter();

  constructor(
    private readonly exerciseService: ExercisesService,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit() {
    this.handleSearch();
    this.exerciseService.getMuscles().subscribe({
      next: (res) => {
        res.map((muscle) => {
          this.musclesOptions.push({ value: muscle.name, label: muscle.name });
        });
      },
    });

    this.exerciseService.getEquipaments().subscribe({
      next: (res) => {
        res.map((equipament) => {
          this.equipamentsOptions.push({ value: equipament.name, label: equipament.name });
        });
      },
    });
  }

  handleSearch() {
    this.searchTerm.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((term) => {
        this.updateFilters('search', term);
      });
  }

  updateFilters(key: string, value: any) {
    this.filters = { ...this.filters, [key]: value };
    this.onUpdateFilters.emit(this.filters);
  }
}
