import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { MessageService } from 'primeng/api';
import { authInterceptor } from './app/interceptors/auth.interceptor';

// Configuration pour le bootstrap de l'application
bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    // Ajouter le HttpClient avec l'intercepteur
    provideHttpClient(
      withInterceptors([authInterceptor]) // Enregistrement de l'intercepteur
    ),
    provideRouter(routes), // Fourniture des routes
    MessageService, // Fourniture de services tiers
    importProvidersFrom(BrowserAnimationsModule), // Animation Module

  ],
}).catch((err) => console.error(err));
