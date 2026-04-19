import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { BASE_PATH } from '@/api';
import { authInterceptor } from '@/core/interceptors/auth-interceptor';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    { provide: BASE_PATH, useValue: 'http://localhost:8080' },
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
};
