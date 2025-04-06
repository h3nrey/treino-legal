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
  
  constructor(private readonly fb: FormBuilder, private readonly userService: UserService, private readonly router: Router) {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if(this.signupForm.valid) {
      this.loading = true;
      this.signupForm.disable(); 

      setTimeout(() => {
        console.log(this.signupForm.value);
        this.userService.createUser(this.signupForm.value).subscribe({
          next: (res) => {
            localStorage.setItem('token', res.token);
            localStorage.setItem('user', JSON.stringify(res.user));
            this.router.navigate(['/']);
          },
          error: (err) => {
            console.error('Error creating user', err);
            console.log("teste");
          }
        });
      }, 500)
    }
  }
}
