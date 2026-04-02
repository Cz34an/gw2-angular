import { Component, inject } from '@angular/core';

import { EventsStore } from './state';

@Component({
  selector: 'app-events',
  imports: [],
  providers: [EventsStore],
  templateUrl: './events.html',
  styleUrl: './events.scss',
})
export class Events {
  protected readonly store = inject(EventsStore);
}
