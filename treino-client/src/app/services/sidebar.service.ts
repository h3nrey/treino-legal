import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  constructor() { }

  private sidebarOpen = new BehaviorSubject<boolean>(false); // Default state: closed
  sidebarStatus$ = this.sidebarOpen.asObservable(); // Observable for components to subscribe

  toggleSidebar(): void {
    this.sidebarOpen.next(!this.sidebarOpen.value); // Toggle the sidebar status
  }

  setSidebarState(state: boolean): void {
    this.sidebarOpen.next(state); // Set a specific state
  }

  getSidebarState(): boolean {
    return this.sidebarOpen.value; // Get the current state
  }
}
