import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/users.service.ts.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  loading: boolean = false;

  constructor(
    private readonly fb: FormBuilder, 
    private readonly userService: UserService, 
    private readonly router: Router,
    private readonly _location: Location
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  closeModal () {
    this.router.navigate([{outlets: {modal: null}}]);
  }

  navigateToSignup() {
    this.router.navigate([{outlets: {modal: ['register']}}]);
  }

  onSubmit() {
    if(!this.loginForm.valid) return;

    this.userService.loginUser(this.loginForm.value).subscribe({
      next: (res) => {
        this.router.navigate(["/"])
      }, 
      error: (err) => {
        console.error('Error logging in', err);
      }
    });
  }
}
