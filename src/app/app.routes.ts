import { Routes } from '@angular/router';
import { Dashboard } from './views/dashboard/dashboard';
import { Events } from './views/events/events';

export const routes: Routes = [
  { path: '', component: Dashboard },
  { path: 'events', component: Events },
];
