import { inject, InjectionToken, Signal } from '@angular/core';
import { CurrentUser } from '@/core/models/current-user';
import { AuthStore } from '@/core/stores/auth-store';

export const CURRENT_USER = new InjectionToken<Signal<CurrentUser | null>>('Current User', {
  providedIn: 'root',
  factory: () => {
    const store = inject(AuthStore);

    return store.currentUser;
  },
});
