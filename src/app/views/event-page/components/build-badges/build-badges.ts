import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { HlmBadge } from '@spartan-ng/helm/badge';

import { BuildDto } from '@/api';

@Component({
  selector: 'app-build-badges',
  imports: [HlmBadge],
  templateUrl: './build-badges.html',
  styleUrl: './build-badges.scss',
  host: {
    class: 'flex flex-wrap items-center gap-1',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuildBadges {
  public readonly build = input.required<BuildDto>();
}
