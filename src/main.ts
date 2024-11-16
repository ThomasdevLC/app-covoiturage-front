import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { MessageService } from 'primeng/api';



bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [provideHttpClient(), provideRouter(routes), MessageService,importProvidersFrom(BrowserAnimationsModule) 
  ],
}).catch((err) => console.error(err));
