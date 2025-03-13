import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../../services/auth.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const isAuthRoute = route.routeConfig?.path === '' || route.routeConfig?.path === 'register';
  
  if(authService.isLoggedIn() && isAuthRoute)
  {
    router.navigate(['home']);
    return false;
  }

  
  if(!authService.isLoggedIn() && !isAuthRoute)
  {
    router.navigate(['/']);
    return false;
  }
  

  return true;
};
