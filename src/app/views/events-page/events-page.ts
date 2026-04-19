import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { EventCard } from './components';
import { EventsStore } from './stores';

@Component({
  selector: 'app-events-page',
  imports: [EventCard],
  providers: [EventsStore],
  templateUrl: './events-page.html',
  styleUrl: './events-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsPage {
  protected readonly store = inject(EventsStore);
}
