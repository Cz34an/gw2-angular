import { inject, InjectionToken, Signal } from '@angular/core';

import { CurrentUserModel } from '@/core/models';
import { AuthStore } from '@/core/stores';

export const CURRENT_USER = new InjectionToken<Signal<CurrentUserModel | null>>(
  'Current User',
  {
    providedIn: 'root',
    factory: () => {
      const store = inject(AuthStore);

      return store.currentUser;
    },
  },
);
