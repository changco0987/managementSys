import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { LoadingService } from '../../services/loading/loading.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService); // Use inject() for services in functional interceptors

  loadingService.setLoading(true);

  return next(req).pipe(
    finalize(() => loadingService.setLoading(false))
  );
};
