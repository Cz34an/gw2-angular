import { DatePipe } from '@angular/common';
import { Component, effect, inject, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCalendar, lucideTimer } from '@ng-icons/lucide';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmIcon } from '@spartan-ng/helm/icon';

import { DurationPipe } from '@/core/pipes';

import { ChooseRoleDialog, EventSlot } from './components';
import { EventDetailsStore } from './stores';

@Component({
  selector: 'app-event-page',
  imports: [
    HlmCardImports,
    HlmIcon,
    NgIcon,
    DatePipe,
    DurationPipe,
    EventSlot,
    ChooseRoleDialog,
  ],
  providers: [EventDetailsStore, provideIcons({ lucideTimer, lucideCalendar })],
  templateUrl: './event-page.html',
  styleUrl: './event-page.scss',
  host: {
    class: 'flex flex-col @5xl:flex-row gap-4',
  },
})
export class EventPage {
  protected readonly store = inject(EventDetailsStore);

  public readonly id = input.required<string>();

  private readonly loadEventDetails = effect(() => {
    this.store.loadEventById(this.id());
  });
}
