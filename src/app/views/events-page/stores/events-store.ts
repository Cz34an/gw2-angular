import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';

import { EventControllerService, EventResponseShortDto } from '@/api';

interface EventsState {
  events: EventResponseShortDto[];
  isLoading: boolean;
  hasError: boolean;
}

const initialState: EventsState = {
  events: [],
  isLoading: false,
  hasError: false,
};

export const EventsStore = signalStore(
  withState(initialState),
  withMethods((store, eventsService = inject(EventControllerService)) => ({
    loadEvents: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true, hasError: false })),
        switchMap(() => {
          return eventsService.getEvents().pipe(
            tapResponse({
              next: (events) =>
                patchState(store, { events: events, isLoading: false }),
              error: () =>
                patchState(store, { isLoading: false, hasError: true }),
            }),
          );
        }),
      ),
    ),
  })),
  withHooks({
    onInit(store) {
      store.loadEvents();
    },
  }),
);
