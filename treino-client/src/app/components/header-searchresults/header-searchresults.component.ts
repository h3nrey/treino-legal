import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'SearchResultsContainer',
  imports: [RouterLink],
  templateUrl: './header-searchresults.component.html',
  styleUrl: './header-searchresults.component.scss',
})
export class HeaderSearchresultsComponent {
  @Input() results: any[] = [];
  @Output() clearResultsEv = new EventEmitter<void>();

  clearResults() {
    this.clearResultsEv.emit();
  }
}
