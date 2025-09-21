import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/users.service.ts.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  loggedSucessfully: boolean | null = null;
  loading: boolean = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly userService: UserService,
    private readonly router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  closeModal() {
    this.router.navigate([{ outlets: { modal: null } }]);
  }

  navigateToSignup() {
    this.router.navigate([{ outlets: { modal: ['register'] } }]);
  }

  onSubmit() {
    if (!this.loginForm.valid) return;

    this.loading = true;

    this.userService.loginUser(this.loginForm.value).subscribe({
      next: (res) => {
        this.loggedSucessfully = true;
        this.loading = false;
        this.router.navigate(['/']).then(() => {
          window.location.reload();
        });
      },
      error: (err) => {
        this.loading = false;
        this.loggedSucessfully = false;
      },
    });
  }
}
