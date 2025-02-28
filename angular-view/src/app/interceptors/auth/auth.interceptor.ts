import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const token = localStorage.getItem('authToken');

  // Clone request and add Authorization header if token exists
  const authReq = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;

  return next(authReq).pipe(
    catchError((error) => {
      if (error.status === 401) {
        console.error('Unauthorized - Redirecting to login');
        localStorage.removeItem('authToken'); // Remove invalid token
        router.navigate(['/login']); // Redirect user
      }
      return throwError(() => error);
    })
  );
};
