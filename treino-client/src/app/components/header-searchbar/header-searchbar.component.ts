import { Component, ElementRef, HostListener } from '@angular/core';
import { HeaderSearchresultsComponent } from "../header-searchresults/header-searchresults.component";
import { debounce } from '../../utils/utils';
import { Exercise } from '../../utils/interfaces';
import { ExercisesService } from '../../services/exercises.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'HeaderSearchbar',
  imports: [HeaderSearchresultsComponent, FormsModule],
  templateUrl: './header-searchbar.component.html',
  styleUrl: './header-searchbar.component.scss'
})
export class HeaderSearchbarComponent {
  constructor(
    private exerciseService: ExercisesService, 
    private eRef: ElementRef, 
    private router: Router
  ) {}
  searchTerm: string = '';
  searchedResults: Exercise[] = [];
  private readonly searchDelay = 500;
  showResults = false;
  searchIcon = "assets/icons/search.svg"
  exercises = []
  
  debouncedSearch = debounce((term) => {
    this.searchedResults = this.exercises;
    this.exerciseService.getExercises({
      search: term,
      count: 5,
      page: 0,
    }).subscribe(data => {
      this.searchedResults = data.data;
    })
  }, this.searchDelay);

  loadExercisesResults(term: string) {
    this.searchedResults = this.exercises;
      this.exerciseService.getExercises({
        search: term,
        count: 5,
        page: 0,
      }).subscribe({
        next: (data) => {
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
    this.router.navigate(['/search'], {queryParams: {keyword: this.searchTerm}})
  }
}
