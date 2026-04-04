import { Pipe, PipeTransform } from '@angular/core';
import { intervalToDuration } from 'date-fns';

@Pipe({
  name: 'duration',
  standalone: true,
})
export class DurationPipe implements PipeTransform {
  transform(startDate: Date | string, endDate: Date | string): string {
    if (!startDate || !endDate) {
      return '';
    }

    const duration = intervalToDuration({
      start: new Date(startDate),
      end: new Date(endDate),
    });

    const parts = [];

    if (duration.days) {
      parts.push(`${duration.days}d`);
    }
    if (duration.hours) {
      parts.push(`${duration.hours}h`);
    }
    if (duration.minutes) {
      parts.push(`${duration.minutes}m`);
    }

    if (parts.length === 0) {
      return '< 1m';
    }

    return parts.join(' ');
  }
}
