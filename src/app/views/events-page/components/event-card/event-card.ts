import { DatePipe, UpperCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideCalendar,
  lucideSwords,
  lucideTimer,
  lucideUsers,
} from '@ng-icons/lucide';
import { HlmAvatarImports } from '@spartan-ng/helm/avatar';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmCard, HlmCardImports } from '@spartan-ng/helm/card';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { HlmProgressImports } from '@spartan-ng/helm/progress';

import { EventResponseShortDto } from '@/api';
import { DurationPipe } from '@/core/pipes';
import { isFractalCategory, isRaidCategory } from '@/core/utils';

@Component({
  selector: 'app-event-card',
  imports: [
    DatePipe,
    DurationPipe,
    HlmAvatarImports,
    HlmBadgeImports,
    HlmButton,
    HlmCardImports,
    HlmIcon,
    HlmProgressImports,
    NgIcon,
    RouterLink,
    UpperCasePipe,
  ],
  providers: [
    provideIcons({ lucideSwords, lucideTimer, lucideUsers, lucideCalendar }),
  ],
  hostDirectives: [HlmCard],
  templateUrl: './event-card.html',
  styleUrl: './event-card.scss',
  host: {
    class: 'flex flex-col',
    '[class.raid]': 'isRaid()',
    '[class.fractal]': 'isFractal()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventCard {
  public readonly event = input.required<EventResponseShortDto>();

  protected readonly occupancyPercentage = computed(
    () => (this.event().occupiedSlotsSize / this.event().slotsSize) * 100,
  );

  protected readonly isRaid = computed(() =>
    isRaidCategory(this.event().category),
  );

  protected readonly isFractal = computed(() =>
    isFractalCategory(this.event().category),
  );
}
