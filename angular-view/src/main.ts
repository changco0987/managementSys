import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { loadingInterceptor } from './app/interceptors/loading/loading.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { authInterceptor } from './app/interceptors/auth/auth.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), 
    provideHttpClient(withInterceptors([loadingInterceptor, authInterceptor])), 
    provideAnimationsAsync(),
  ],
}).catch((err) => console.error(err));
