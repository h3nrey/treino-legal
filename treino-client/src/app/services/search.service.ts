import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private clearFiltersSubject = new Subject<void>();

  clearFilters = this.clearFiltersSubject.asObservable();

  constructor() {}

  emitClearFilters() {
    this.clearFiltersSubject.next();
  }
}
