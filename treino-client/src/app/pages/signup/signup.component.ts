import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/users.service.ts.service';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm: FormGroup;
  
  constructor(private fb: FormBuilder, private userService: UserService) {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if(this.signupForm.valid) {
      console.log('Form Submitted!', this.signupForm.value);
      this.userService.createUser(this.signupForm.value).subscribe({
        next: (res) => {
          console.log('User created successfully!', res);
          // Handle successful signup, e.g., redirect to login or home page
        },
        error: (err) => {
          console.error('Error creating user', err);
          // Handle error, e.g., show error message to user
        }
      });
    }
  }
}
