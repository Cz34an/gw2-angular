import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';

import { EventDetailsStore } from '../../stores';
import { ChooseRoleFormContent } from './components';

@Component({
  selector: 'app-choose-role-dialog',
  standalone: true,
  imports: [ChooseRoleFormContent, HlmDialogImports],
  templateUrl: './choose-role-dialog.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChooseRoleDialog {
  protected readonly store = inject(EventDetailsStore);

  protected readonly dialogState = computed<'open' | 'closed'>(() =>
    this.store.selectedFreeSlot() != null ? 'open' : 'closed',
  );

  protected closeDialog(): void {
    this.store.setSelectedFreeSlot(null);
  }
}
