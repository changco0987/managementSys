import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' }) // This still works
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  /** Register User */
  register(user: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  /** Login User */
  login(user: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, user).pipe(
      tap((response: any) => {
        if (response.token) 
        {
          localStorage.setItem('auth_token', response.token);
          console.log(response.token);
        }
        
      })
    );
  }

  /** Logout */
  logout() {
    localStorage.removeItem('auth_token');
  }

  /** Check if user is authenticated */
  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth_token');
  }
}
