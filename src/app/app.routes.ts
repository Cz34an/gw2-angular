import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./views/dashboard-page/dashboard-page').then(
        (m) => m.DashboardPage,
      ),
  },
  {
    path: 'events',
    loadComponent: () =>
      import('./views/events-page/events-page').then((m) => m.EventsPage),
  },
  {
    path: 'events/:id',
    loadComponent: () =>
      import('./views/event-page/event-page').then((m) => m.EventPage),
  },
];
