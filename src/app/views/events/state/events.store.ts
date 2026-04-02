import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { EventControllerService, EventResponseDto } from '../../../core/api';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';

type EventsState = {
  events: EventResponseDto[];
  isLoading: boolean;
  hasError: boolean;
};

const initialState: EventsState = {
  events: [],
  isLoading: false,
  hasError: false,
};

export const EventsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, eventsService = inject(EventControllerService)) => ({
    loadEvents: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true, hasError: false })),
        switchMap(() => {
          return eventsService.getEvents().pipe(
            tapResponse({
              next: (events) => {
                console.log(events);
                patchState(store, { events: events, isLoading: false });
              },
              error: () => patchState(store, { isLoading: false, hasError: true }),
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
