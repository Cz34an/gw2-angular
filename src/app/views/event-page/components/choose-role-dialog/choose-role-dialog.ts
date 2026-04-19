import { Component, computed, effect, inject, signal } from '@angular/core';
import { EventDetailsStore } from '../../stores/event-details.store';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { BuildBadges } from '../build-badges/build-badges';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { HlmToggleImports } from '@spartan-ng/helm/toggle';
import { ALACRITY_ROLES, GENERIC_ROLES, QUICKNESS_ROLES } from '@/core/consts/roles-consts';
import { BuildDto, EventSignupDto } from '@/api';

@Component({
  selector: 'app-choose-role-dialog',
  imports: [HlmDialogImports, HlmButtonImports, BuildBadges, HlmSelectImports, HlmToggleImports],
  templateUrl: './choose-role-dialog.html',
  styleUrl: './choose-role-dialog.scss',
})
export class ChooseRoleDialog {
  protected dialogState = signal<'open' | 'closed'>('closed');

  protected readonly store = inject(EventDetailsStore);
  protected readonly isGenericBoonSelected = computed(() => {
    const baseRole = this.store.selectedFreeSlot()?.requiredBuild?.baseRole;

    return baseRole != null && GENERIC_ROLES.includes(baseRole);
  });
  protected readonly isAlacrityEffectiveBuild = computed(() => {
    const effectiveRole = this.store.selectedFreeSlot()?.effectiveBuild?.baseRole;

    return effectiveRole != null && ALACRITY_ROLES.includes(effectiveRole);
  });
  protected readonly isQuicknessEffectiveBuild = computed(() => {
    const effectiveRole = this.store.selectedFreeSlot()?.effectiveBuild?.baseRole;

    return effectiveRole != null && QUICKNESS_ROLES.includes(effectiveRole);
  });

  protected flexBuilds: BuildDto[] = [];
  private readonly onFreeSlotSelected = effect(() => {
    const freeSlot = this.store.selectedFreeSlot();

    if (freeSlot) {
      this.openDialog();
    }
  });
  private readonly onDialogClosed = effect(() => {
    const dialogState = this.dialogState();

    if (dialogState === 'closed') {
      this.store.setSelectedFreeSlot(null);
      this.flexBuilds = [];
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
