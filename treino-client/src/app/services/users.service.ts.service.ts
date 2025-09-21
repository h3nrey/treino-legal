import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { User } from '../utils/interfaces';
import { environment } from '../../enviroments/enviroment';

interface LoginResponse {
  token: string;
  user: {
    username: string;
    email: string;
    id: string;
  };
}
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUserSubject!: BehaviorSubject<User | null>;
  public currentUser!: Observable<User | null>;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.getUser().subscribe({
      next: (storedUser) => {
        this.currentUserSubject = new BehaviorSubject<User | null>(storedUser);
        this.currentUser = this.currentUserSubject.asObservable();
      },
      error: (err) => console.error(err),
    });
  }

  createUser(user: {
    username: string;
    email: string;
    password: string;
  }): Observable<{ token: string; user: { username: string } }> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/users/signup`, user).pipe(
      tap((response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.currentUserSubject.next(response.user);
      }),
      catchError((error) => {
        return throwError(() => new Error('Error logging in'));
      })
    );
  }

  loginUser(user: { username: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/users/login`, user).pipe(
      tap((response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.currentUserSubject.next(response.user);
      }),
      catchError((error) => {
        return throwError(() => new Error('Error logging in'));
      })
    );
  }

  logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    window.location.assign('/');
  }

  getUser(): Observable<User | null> {
    return new Observable((observer) => {
      try {
        const userData = localStorage.getItem('user');
        observer.next(userData ? JSON.parse(userData) : null);
        observer.complete();
      } catch (error: any) {
        console.log(error);
        observer.error('Error reading user data');
      }
    });
  }

  getUserProfile(username: string) {
    return this.http
      .get<User>(`${environment.apiUrl}/users/me`, {
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
        },
      })
      .pipe(
        catchError((error) => {
          console.error('Error fetching user profile:', error);
          return throwError(() => new Error('Error fetching user profile'));
        })
      );
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
