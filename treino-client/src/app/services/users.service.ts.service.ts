import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../utils/interfaces';
import { environment } from '../../enviroments/enviroment';


interface LoginResponse {
  token: string;
  user: {
    username: string;
    email: string;
    // Add other user properties you expect here
  };
}
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject!: BehaviorSubject<User | null>;
  public currentUser!: Observable<User | null>;

  constructor(private http: HttpClient, private router: Router) { 
    this.getUser().subscribe({
      next: (storedUser) => {
        this.currentUserSubject = new BehaviorSubject<User | null>(storedUser);
        this.currentUser = this.currentUserSubject.asObservable();
      },
      error: (err) => console.error(err)
    });
  }


  createUser(user: {
    username: string;
    email: string;
    password: string;
  }): Observable<{token: string, user: {username: string}}> {
    return this.http.post(`${environment.apiUrl}/users/signup`, user) as Observable<{token: string, user: {username: string}}>;
  }

  loginUser(user: {username: string, password: string}): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/users/login`, user).pipe(
      tap((response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.currentUserSubject.next(response.user);
      })
    );
  }

  logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.router.navigate(['/']);
  }

  getUser(): Observable<User | null> {
    return new Observable((observer) => {
      try {
        const userData = localStorage.getItem('user');
        observer.next(userData ? JSON.parse(userData) : null);
        observer.complete();
      } catch (error) {
        observer.error('Error reading user data');
      }
    });
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
