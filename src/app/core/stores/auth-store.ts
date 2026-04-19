import { computed, effect, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { jwtDecode } from 'jwt-decode';
import { pipe, switchMap } from 'rxjs';

import { AuthControllerService } from '@/api';
import { CurrentUserModel, RawJwtPayload } from '@/core/models';

interface AuthState {
  token: string | null;
}

const TOKEN_KEY = 'auth_token';

const initialState: AuthState = {
  token: localStorage.getItem(TOKEN_KEY),
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ token }) => ({
    currentUser: computed(() => {
      const currentToken = token();
      if (!currentToken) return null;

      try {
        const decoded = jwtDecode<RawJwtPayload>(currentToken);
        const user: CurrentUserModel = {
          ...decoded,
          sub: Number(decoded.sub),
        };

        if (isNaN(user.sub)) {
          console.error('Błąd: pole sub w tokenie nie jest poprawną liczbą');
          return null;
        }

        return user;
      } catch (error) {
        console.error('Nieprawidłowy format tokena', error);
        return null;
      }
    }),
    isAuthorized: computed(() => !!token()),
  })),
  withMethods((store, authService = inject(AuthControllerService)) => ({
    fakeLogin: rxMethod<number>(
      pipe(
        switchMap((userId) =>
          authService.getTestToken(userId).pipe(
            tapResponse({
              next: ({ token }) => patchState(store, { token }),
              error: () => console.error('error'),
            }),
          ),
        ),
      ),
    ),
  })),
  withHooks({
    onInit(store) {
      effect(() => {
        const token = store.token();

        if (token) {
          localStorage.setItem(TOKEN_KEY, token);
        } else {
          localStorage.removeItem(TOKEN_KEY);
        }
      });
    },
  }),
);
