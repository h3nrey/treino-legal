import { AfterViewChecked, AfterViewInit, Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { debounce } from '../../../utils/utils';
import { FormsModule } from '@angular/forms';
import { exercises } from '../../../../data';
import { Router, RouterLink } from '@angular/router';
import { ExercisesService } from '../../../services/exercises.service';
import { Exercise, User } from '../../../utils/interfaces';
import { UserService } from '../../../services/users.service.ts.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'home-header',
  imports: [FormsModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HomeHeaderComponent implements OnInit {
  constructor(
    private exerciseService: ExercisesService, 
    private eRef: ElementRef, 
    private router: Router, 
    private readonly userService: UserService
  ) {}
  user: any = null;
  searchTerm: string = '';
  searchedResults: Exercise[] = [];
  private readonly searchDelay = 500;
  showResults = false;
  searchIcon = "assets/icons/search.svg"
 
  ngOnInit() {
    const storedUser = this.userService.getUser();
    if (storedUser) {
      this.user = storedUser;
    }

    this.userService.currentUser.subscribe({
      next: (user) => { 
        this.user = user;
      }
    });
  }



  debouncedSearch = debounce((term) => {
    this.searchedResults = exercises;
    this.exerciseService.getExercises({
      search: term,
      count: 5,
      page: 0,
    }).subscribe(data => {
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

  logout() {
    this.userService.logoutUser();
  }
}
