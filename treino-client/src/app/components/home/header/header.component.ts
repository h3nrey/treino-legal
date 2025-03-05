import { Component, ElementRef, HostListener } from '@angular/core';
import { debounce } from '../../../utils/utils';
import { FormsModule } from '@angular/forms';
import { exercises } from '../../../../data';
import { Router, RouterLink } from '@angular/router';
import { ExercisesService } from '../../../services/exercises.service';
import { Exercise } from '../../../utils/interfaces';

@Component({
  selector: 'home-header',
  imports: [FormsModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HomeHeaderComponent {
  constructor(private exerciseService: ExercisesService, private eRef: ElementRef, private router: Router) {}
  searchTerm: string = '';
  searchedResults: Exercise[] = [];
  private readonly searchDelay = 500;
  showResults = false;
  searchIcon = "assets/icons/search.svg"

  debouncedSearch = debounce((term) => {
    this.searchedResults = exercises;
    this.exerciseService.getExercises({
      search: term,
      count: 5,
      page: 0,
    }).subscribe(data => {
      console.log(data);
      this.searchedResults = data.data;
    })
  }, this.searchDelay);

  loadExercisesResults(term: string) {
    this.searchedResults = exercises;
      this.exerciseService.getExercises({
        search: term,
        count: 5,
        page: 0,
      }).subscribe({
        next: (data) => {
          console.log(data);
          this.searchedResults = data.data;
        }
      })
  }

  onSearchInput(event: Event) {
    const term = (event.target as HTMLInputElement).value;
    this.debouncedSearch(term);
  }

  clearResults() {
    this.searchedResults = [];
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.clearResults();
    }
  }

  submitSearch() {
    this.clearResults();
    this.router.navigate(['/search'], {queryParams: {keyword: this.searchTerm, page: 0}})
  }
}
