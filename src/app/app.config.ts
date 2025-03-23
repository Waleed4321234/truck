import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; // Import this
import { HomeComponent } from './pages/home/home.component';
import { JobApplicationComponent } from './pages/job-application/job-application.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      { path: '', component: HomeComponent },  // Home Page
      { path: 'apply', component: JobApplicationComponent }  // Job Application Page
    ]),
    provideHttpClient() // Add HttpClient support
  ]
};
