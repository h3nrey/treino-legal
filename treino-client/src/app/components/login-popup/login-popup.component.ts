import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'LoginPopup',
  imports: [],
  templateUrl: './login-popup.component.html',
  styleUrl: './login-popup.component.scss',
})
export class LoginPopupComponent {
  constructor(private router: Router) {}
  goToLogin(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.router.navigate([{ outlets: { modal: ['login'] } }]);
  }
}
