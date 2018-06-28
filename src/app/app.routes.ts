import { Routes } from '@angular/router';
import * as pages from './pages/';

export const ROUTES: Routes = [
  { path: '', component: pages.LoginComponent },
  { path: 'login', component: pages.LoginComponent },
  { path: 'home', component: pages.HomeComponent },
  { path: 'about', component: pages.AboutComponent },
  { path: '**', component: pages.NoContentComponent }
];
