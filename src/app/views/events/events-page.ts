import { Component, inject } from '@angular/core';

import { EventsStore } from './state';
import { EventCard } from './components/event-card/event-card';

@Component({
  selector: 'app-events',
  imports: [EventCard],
  providers: [EventsStore],
  templateUrl: './events-page.html',
  styleUrl: './events-page.scss',
})
export class EventsPage {
  protected readonly store = inject(EventsStore);
}
