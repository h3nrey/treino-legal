import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type SnackType = 'success' | 'warning' | 'error';

export interface SnackMessage {
  message: string;
  type: SnackType;
}
@Injectable({
  providedIn: 'root',
})
export class SnackService {
  private snackSubject = new BehaviorSubject<SnackMessage | null>(null);
  snack$ = this.snackSubject.asObservable();

  show(message: string, type: SnackType = 'success') {
    this.snackSubject.next({ message, type });

    setTimeout(() => {
      this.snackSubject.next(null);
    }, 3000);
  }
}
