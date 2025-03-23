import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { JobApplicationComponent } from './pages/job-application/job-application.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'apply', component: JobApplicationComponent }
];