import { Routes } from '@angular/router';
import { DashboardPage } from './views/dashboard-page/dashboard-page';
import { EventsPage } from './views/events-page/events-page';

export const routes: Routes = [
  { path: '', component: DashboardPage },
  { path: 'events', component: EventsPage },
];
