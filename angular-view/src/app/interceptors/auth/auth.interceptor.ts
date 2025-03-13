import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const cookieService = inject(CookieService);
  const token = cookieService.get('authToken');//get token from cookies

  // Clone request and add Authorization header if token exists
  const authReq = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;

  return next(authReq).pipe(
    catchError((error) => {
      if (error.status === 401) {
        console.error('Unauthorized - Redirecting to login');
        cookieService.delete('authToken'); // Remove invalid token
        router.navigate(['/login']); // Redirect user
      }
      return throwError(() => error);
    })
  );
};
