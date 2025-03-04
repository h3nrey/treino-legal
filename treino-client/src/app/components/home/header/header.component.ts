import { Component } from '@angular/core';
import { debounce } from '../../../utils/utils';
import { FormsModule } from '@angular/forms';
import { exercises } from '../../../../data';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'home-header',
  imports: [FormsModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HomeHeaderComponent {

  searchTerm: string = '';
  searchedResults: { name: string }[] = [];
  handleSearch(searchTerm: string) {
    const searchDelay = 450;

    const debouncedSearch = debounce((searchTerm: string) => {
      this.searchedResults = exercises;
    }, searchDelay);

    debouncedSearch(searchTerm);
  }

  onSearchInput(event: Event) {
    const term = (event.target as HTMLInputElement).value;
    this.handleSearch(term);
  }
}
