import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  createUser(user: {
    username: string;
    email: string;
    password: string;
  }): Observable<{token: string, user: {username: string, email: string}}> {
    return this.http.post('http://localhost:3000/users/signup', user) as Observable<{token: string, user: {username: string, email: string}}>;
  }
}
