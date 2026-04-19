import { Component, computed, effect, inject, signal } from '@angular/core';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { HlmToggleImports } from '@spartan-ng/helm/toggle';

import { BuildDto, EventSignupDto } from '@/api';
import {
  ALACRITY_ROLES,
  GENERIC_ROLES,
  QUICKNESS_ROLES,
} from '@/core/consts/roles-consts';

import { EventDetailsStore } from '../../stores';
import { BuildBadges } from '../build-badges';

@Component({
  selector: 'app-choose-role-dialog',
  imports: [
    BuildBadges,
    HlmButtonImports,
    HlmDialogImports,
    HlmSelectImports,
    HlmToggleImports,
  ],
  templateUrl: './choose-role-dialog.html',
  styleUrl: './choose-role-dialog.scss',
})
export class ChooseRoleDialog {
  protected readonly store = inject(EventDetailsStore);

  protected readonly dialogState = signal<'open' | 'closed'>('closed');
  protected flexBuilds: BuildDto[] = [];

  protected readonly isAlacrityEffectiveBuild = computed(() => {
    const effectiveRole =
      this.store.selectedFreeSlot()?.effectiveBuild?.baseRole;

    return effectiveRole != null && ALACRITY_ROLES.includes(effectiveRole);
  });

  protected readonly isGenericBoonSelected = computed(() => {
    const baseRole = this.store.selectedFreeSlot()?.requiredBuild?.baseRole;

    return baseRole != null && GENERIC_ROLES.includes(baseRole);
  });

  protected readonly isQuicknessEffectiveBuild = computed(() => {
    const effectiveRole =
      this.store.selectedFreeSlot()?.effectiveBuild?.baseRole;

    return effectiveRole != null && QUICKNESS_ROLES.includes(effectiveRole);
  });

  private readonly onDialogClosed = effect(() => {
    const dialogState = this.dialogState();

    if (dialogState === 'closed') {
      this.store.setSelectedFreeSlot(null);
      this.flexBuilds = [];
    }
  });

  private readonly onFreeSlotSelected = effect(() => {
    const freeSlot = this.store.selectedFreeSlot();

    if (freeSlot) {
      this.openDialog();
    }
  });

  protected onSignIn(): void {
    const id = this.store.eventDetails()!.id;
    const slot = this.store.selectedFreeSlot()!;
    const eventSignupDto: EventSignupDto = {
      targetSlotId: slot.id,
      primaryBuild: slot.requiredBuild,
      flexBuilds: this.flexBuilds,
    };

    this.store.signUpForEvent({
      id,
      eventSignupDto,
      onSuccess: () => {
        this.closeDialog();
      },
    });
  }

  protected closeDialog(): void {
    this.dialogState.set('closed');
  }

  private openDialog(): void {
    this.dialogState.set('open');
  }
}
