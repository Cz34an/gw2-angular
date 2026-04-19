import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { HlmCard, HlmCardImports } from '@spartan-ng/helm/card';
import { EventResponseShortDto } from '@/api';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCalendar, lucideSwords, lucideTimer, lucideUsers } from '@ng-icons/lucide';
import { HlmAvatarImports } from '@spartan-ng/helm/avatar';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { HlmProgressImports } from '@spartan-ng/helm/progress';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { DurationPipe } from '@/core/pipes/duration-pipe';
import { HlmButton } from '@spartan-ng/helm/button';
import { isFractalCategory, isRaidCategory } from '@/core/utils/category-utils';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-event-card',
  imports: [
    HlmCardImports,
    HlmIcon,
    NgIcon,
    HlmAvatarImports,
    UpperCasePipe,
    DatePipe,
    HlmProgressImports,
    HlmBadgeImports,
    DurationPipe,
    HlmButton,
    RouterLink,
  ],
  providers: [provideIcons({ lucideSwords, lucideTimer, lucideUsers, lucideCalendar })],
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

  protected isRaid = computed(() => isRaidCategory(this.event().category));

  protected isFractal = computed(() => isFractalCategory(this.event().category));
}
