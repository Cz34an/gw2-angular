import { Component, effect, inject, input } from '@angular/core';
import { EventDetailsStore } from './stores/event-details.store';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCalendar, lucideTimer } from '@ng-icons/lucide';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { DatePipe } from '@angular/common';
import { DurationPipe } from '../../core/pipes/duration-pipe';
import { EventSlot } from './components/event-slot/event-slot';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { SlotDto } from '@/api';
import { ChooseRoleDialog } from './components/choose-role-dialog/choose-role-dialog';

@Component({
  selector: 'app-event-page',
  imports: [
    HlmCardImports,
    HlmIcon,
    NgIcon,
    DatePipe,
    DurationPipe,
    EventSlot,
    HlmDialogImports,
    HlmButtonImports,
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
  public readonly id = input.required<string>();

  protected readonly store = inject(EventDetailsStore);

  private readonly loadEventDetails = effect(() => {
    this.store.loadEventById(this.id());
  });

  protected onFreeSlotSelect(slot: SlotDto): void {
    console.log(slot);
  }
}
