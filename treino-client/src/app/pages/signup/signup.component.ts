import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/users.service.ts.service';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm: FormGroup;
  loading: boolean = false;
  response: any = null;
  loggedSucessfully: boolean | null = null;
  
  constructor(private readonly fb: FormBuilder, private readonly userService: UserService, private readonly router: Router) {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  closeModal () {
    this.router.navigate([{outlets: {modal: null}}]);
  }

  navigateToLogin() {
    this.router.navigate([{outlets: {modal: ['login']}}]);
  }

  onSubmit() {
    if(this.signupForm.valid) {
      this.loading = true;
      this.signupForm.disable(); 

      this.userService.createUser(this.signupForm.value).subscribe({
        next: (res) => {
          this.loggedSucessfully = true;
          this.loading = false;
          this.response = res;
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.response = err.error.message;
          this.loading = false;
          this.signupForm.enable(); 
          this.loggedSucessfully = false;
        }
      });
    }
  }
}
