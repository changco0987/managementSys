import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RegistrationData } from '../models/registration-data';
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' }) // This still works
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) {}

  /** Register User */
  register(user: RegistrationData): Observable<any> {
    // Format data if needed (e.g., Date conversion)
    const formattedUser = {
      ...user
    };

    return this.http.post(`${this.apiUrl}/signup`, formattedUser).pipe(
      catchError((error) => {
        // Handle errors (e.g., show user-friendly messages)
        return throwError((error));
      })
    );
  }

  /** Login User */
  login(user: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, user).pipe(
      tap((response: any) => {

        if (response.data.token) 
        {
          this.cookieService.set('authToken', response.data.token, { expires: 7, path: '/' });
        }
        
      })
    );
  }

  /** Logout */
  logout() {
    this.cookieService.delete('authToken');

  }

  /** Check if user is authenticated */
  isLoggedIn(): boolean {
    console.log(this.cookieService.get('authToken'));
    return !!this.cookieService.get('authToken');
  }


}
