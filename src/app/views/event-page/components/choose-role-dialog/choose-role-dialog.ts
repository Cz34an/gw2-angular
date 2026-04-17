import { Component, effect, inject, signal } from '@angular/core';
import { EventDetailsStore } from '../../stores/event-details.store';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { BuildBadges } from '../build-badges/build-badges';
import { HlmSelectImports } from '@spartan-ng/helm/select';

@Component({
  selector: 'app-choose-role-dialog',
  imports: [HlmDialogImports, HlmButtonImports, BuildBadges, HlmSelectImports],
  templateUrl: './choose-role-dialog.html',
  styleUrl: './choose-role-dialog.scss',
})
export class ChooseRoleDialog {
  protected dialogState = signal<'open' | 'closed'>('closed');

  protected readonly store = inject(EventDetailsStore);

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
    }
  });

  protected closeDialog(): void {
    this.dialogState.set('closed');
  }

  private openDialog(): void {
    this.dialogState.set('open');
  }
}
