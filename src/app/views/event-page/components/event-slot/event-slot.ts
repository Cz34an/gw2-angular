import { UpperCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideLockKeyhole, lucideMinus, lucidePlus } from '@ng-icons/lucide';
import {
  HlmAvatar,
  HlmAvatarFallback,
  HlmAvatarImage,
} from '@spartan-ng/helm/avatar';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmIcon } from '@spartan-ng/helm/icon';

import { SlotDto } from '@/api';
import { CURRENT_USER } from '@/core/tokens';

import { EventDetailsStore } from '../../stores';
import { BuildBadges } from '../build-badges';

@Component({
  selector: 'app-event-slot',
  imports: [
    BuildBadges,
    HlmAvatar,
    HlmAvatarFallback,
    HlmAvatarImage,
    HlmButtonImports,
    HlmIcon,
    NgIcon,
    UpperCasePipe,
  ],
  templateUrl: './event-slot.html',
  providers: [provideIcons({ lucidePlus, lucideLockKeyhole, lucideMinus })],
  styleUrl: './event-slot.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'border p-4 rounded-md flex items-center gap-4',
    '[class.subgroup-1]': 'slot().subgroup === 1',
    '[class.subgroup-2]': 'slot().subgroup === 2',
    '[class.empty]': 'isEmpty()',
    '[class.blocked]': 'isBlocked()',
    '(click)': 'onSlotClick()',
  },
})
export class EventSlot {
  protected readonly store = inject(EventDetailsStore);
  private readonly currentUser = inject(CURRENT_USER);

  public readonly slot = input.required<SlotDto>();

  protected readonly isEmpty = computed(
    () => !this.slot().player && !this.slot().blocked,
  );

  protected readonly isBlocked = computed(() => this.slot().blocked);

  protected readonly slotType = computed(() => {
    if (this.isBlocked()) {
      return 'blocked';
    } else if (this.isEmpty()) {
      return 'empty';
    } else {
      return 'occupied';
    }
  });

  protected readonly getName = computed(() => {
    const { player } = this.slot();

    if (!player) {
      return '';
    }

    return player.gw2AccountName || player.username;
  });

  protected readonly isOccupiedByLoggedUser = computed(() => {
    const currentUser = this.currentUser();
    const player = this.slot().player;

    if (!currentUser || !player) {
      return false;
    }

    return player.id === currentUser.sub;
  });

  protected onSlotClick(): void {
    if (this.isEmpty()) {
      this.store.setSelectedFreeSlot(this.slot());
    }
  }
}
