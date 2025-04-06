import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router) { }

  createUser(user: {
    username: string;
    email: string;
    password: string;
  }): Observable<{token: string, user: {username: string}}> {
    return this.http.post('http://localhost:3000/users/signup', user) as Observable<{token: string, user: {username: string}}>;
  }

  loginUser(user: {username: string, password: string}): Observable<{token: string, user: {username: string}}> {
    return this.http.post('http://localhost:3000/users/login', user) as Observable<{token: string, user: {username: string}}>;
  }
  
  logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }

  getUser() {
    const userData = localStorage.getItem('user');
    if(!userData) return null;

    return JSON.parse(userData);
  }
  getToken() {
    return localStorage.getItem('token');
  }
}
