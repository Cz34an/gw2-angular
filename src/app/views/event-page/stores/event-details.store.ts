import { computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { exhaustMap, filter, map, pipe, switchMap, tap } from 'rxjs';

import {
  BuildDto,
  EventControllerService,
  EventResponseDto,
  EventSignupDto,
  SlotDto,
} from '@/api';

interface EventDetailsState {
  eventDetails: EventResponseDto | null;
  selectedFreeSlot: SlotDto | null;
  isLoading: boolean;
  hasError: boolean;
}

const initialState: EventDetailsState = {
  eventDetails: null,
  selectedFreeSlot: null,
  isLoading: false,
  hasError: false,
};

export const EventDetailsStore = signalStore(
  withState(initialState),
  withComputed(({ eventDetails, selectedFreeSlot }) => ({
    allAvailableBuilds: computed(() => {
      const details = eventDetails();
      const selectedSlot = selectedFreeSlot();

      if (!details) return [];

      const generateBuildKey = (build: BuildDto): string => {
        const subRolesKey = build.subRoles
          ? [...build.subRoles].sort().join(',')
          : 'none';
        return `${build.baseRole}-${subRolesKey}`;
      };

      const availableBuildsMap = new Map<string, BuildDto>();

      details.slots.forEach((slot) => {
        const build = slot.requiredBuild;
        availableBuildsMap.set(generateBuildKey(build), build);
      });

      if (selectedSlot) {
        availableBuildsMap.delete(generateBuildKey(selectedSlot.requiredBuild));
      }

      return Array.from(availableBuildsMap, ([key, build]) => ({ key, build }));
    }),
  })),
  withMethods((store, eventsService = inject(EventControllerService)) => ({
    loadEventById: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true, hasError: false })),
        switchMap((id) => {
          return eventsService.getEvent(Number(id)).pipe(
            tapResponse({
              next: (eventDetails) =>
                patchState(store, { eventDetails, isLoading: false }),
              error: () =>
                patchState(store, { isLoading: false, hasError: true }),
            }),
          );
        }),
      ),
    ),
    signUpForEvent: rxMethod<{
      id: number;
      eventSignupDto: EventSignupDto;
    }>(
      pipe(
        exhaustMap(({ id, eventSignupDto }) =>
          eventsService.signUpForEvent(id, eventSignupDto).pipe(
            tapResponse({
              next: (eventDetails) => {
                patchState(store, { eventDetails, selectedFreeSlot: null });
              },
              error: () => console.log('error'),
            }),
          ),
        ),
      ),
    ),
    signOutFromEvent: rxMethod<void>(
      pipe(
        map(() => store.eventDetails()),
        filter((details): details is EventResponseDto => !!details),
        exhaustMap((details) =>
          eventsService.signOutForEvent(details.id).pipe(
            tapResponse({
              next: (eventDetails) => patchState(store, { eventDetails }),
              error: () => console.log('error'),
            }),
          ),
        ),
      ),
    ),
    setSelectedFreeSlot: (slot: SlotDto | null) => {
      patchState(store, { selectedFreeSlot: slot });
    },
  })),
);
