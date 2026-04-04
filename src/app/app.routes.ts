import { Routes } from '@angular/router';
import { Dashboard } from './views/dashboard/dashboard';
import { EventsPage } from './views/events/events-page';

export const routes: Routes = [
  { path: '', component: Dashboard },
  { path: 'events', component: EventsPage },
];
