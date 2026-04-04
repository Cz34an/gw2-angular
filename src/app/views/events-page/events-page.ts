import { Component, inject } from '@angular/core';

import { EventsStore } from './stores';
import { EventCard } from './components/event-card/event-card';

@Component({
  selector: 'app-events-page',
  imports: [EventCard],
  providers: [EventsStore],
  templateUrl: './events-page.html',
  styleUrl: './events-page.scss',
})
export class EventsPage {
  protected readonly store = inject(EventsStore);
}
