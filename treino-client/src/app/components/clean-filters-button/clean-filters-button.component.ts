import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'CleanFiltersButton',
  imports: [],
  templateUrl: './clean-filters-button.component.html',
  styleUrl: './clean-filters-button.component.scss',
})
export class CleanFiltersButtonComponent {
  closeIcon = 'assets/icons/close.svg';
  @Input() hasFilters: boolean = false;
  @Output() emitClearFilters = new EventEmitter<void>();
}
