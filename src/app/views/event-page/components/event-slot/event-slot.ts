import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { SlotDto } from '@/api';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideLockKeyhole, lucideMinus, lucidePlus } from '@ng-icons/lucide';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { HlmAvatar, HlmAvatarFallback, HlmAvatarImage } from '@spartan-ng/helm/avatar';
import { UpperCasePipe } from '@angular/common';
import { EventDetailsStore } from '../../stores/event-details.store';
import { BuildBadges } from '../build-badges/build-badges';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { CURRENT_USER } from '@/core/tokens/auth-token';

@Component({
  selector: 'app-event-slot',
  imports: [
    HlmIcon,
    NgIcon,
    HlmAvatar,
    HlmAvatarFallback,
    HlmAvatarImage,
    UpperCasePipe,
    BuildBadges,
    HlmButtonImports,
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
  public readonly slot = input.required<SlotDto>();
  protected readonly isEmpty = computed(() => !this.slot().player && !this.slot().blocked);
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
  protected readonly store = inject(EventDetailsStore);
  private readonly currentUser = inject(CURRENT_USER);

  protected isOccupiedByLoggedUser = computed(() => {
    const currentUser = this.currentUser();
    const player = this.slot().player;

    if (!currentUser || !player) {
      return false;
    }

    return player.id === currentUser.sub;
  });

  protected onSlotClick() {
    if (this.isEmpty()) {
      this.store.setSelectedFreeSlot(this.slot());
    }
  }
}
