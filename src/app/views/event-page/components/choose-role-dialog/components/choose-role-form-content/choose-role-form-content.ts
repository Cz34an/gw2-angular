import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { HlmToggleImports } from '@spartan-ng/helm/toggle';

import { BuildDto, EventSignupDto, SlotDto } from '@/api';
import { ALACRITY_ROLES, QUICKNESS_ROLES } from '@/core/consts/roles-consts';

import { EventDetailsStore } from '../../../../stores';
import { BuildBadges } from '../../../build-badges';
import BaseRoleEnum = BuildDto.BaseRoleEnum;

@Component({
  selector: 'app-choose-role-form-content',
  standalone: true,
  imports: [
    BuildBadges,
    HlmButtonImports,
    HlmDialogImports,
    HlmSelectImports,
    HlmToggleImports,
  ],
  templateUrl: './choose-role-form-content.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChooseRoleFormContent implements OnInit {
  protected readonly store = inject(EventDetailsStore);

  protected readonly flexBuilds = signal<BuildDto[]>([]);
  protected readonly quicknessToggleState = signal<'on' | 'off'>('off');
  protected readonly alacrityToggleState = signal<'on' | 'off'>('off');

  protected readonly slot = computed(() => this.store.selectedFreeSlot()!);

  protected readonly isGenericBoonRequired = computed(
    () => this.isGenericHealRequired() || this.isGenericBoonDpsRequired(),
  );

  protected readonly isGenericHealRequired = computed(
    () =>
      this.slotRequiredRole() != null &&
      this.slotRequiredRole() === BaseRoleEnum.GenericHeal,
  );

  protected readonly isGenericBoonDpsRequired = computed(
    () =>
      this.slotRequiredRole() != null &&
      this.slotRequiredRole() === BaseRoleEnum.GenericBoonDps,
  );

  protected readonly isAlacrityEffectiveBuild = computed(() => {
    const effectiveRole = this.slotEffectiveRole();
    return effectiveRole != null && ALACRITY_ROLES.includes(effectiveRole);
  });

  protected readonly isQuicknessEffectiveBuild = computed(() => {
    const effectiveRole = this.slotEffectiveRole();
    return effectiveRole != null && QUICKNESS_ROLES.includes(effectiveRole);
  });

  protected readonly slotRequiredRole = computed(
    () => this.slot().requiredBuild.baseRole,
  );

  protected readonly slotEffectiveRole = computed(
    () => this.slot().effectiveBuild?.baseRole,
  );

  protected readonly isFormValid = computed(() => {
    if (!this.isGenericBoonRequired()) return true;
    return (
      this.quicknessToggleState() === 'on' ||
      this.alacrityToggleState() === 'on'
    );
  });

  ngOnInit(): void {
    this.initializeBoonsToggleSwitches();
  }

  protected onSignUp(): void {
    const eventId = this.store.eventDetails()?.id;
    if (!eventId) return;

    const primaryBuild = this.resolvePrimaryBuild(this.slot());

    const eventSignupDto: EventSignupDto = {
      targetSlotId: this.slot().id,
      primaryBuild,
      flexBuilds: this.flexBuilds(),
    };

    this.store.signUpForEvent({
      id: eventId,
      eventSignupDto,
    });
  }

  protected onAlacrityToggleSwitch(value: 'on' | 'off'): void {
    this.alacrityToggleState.set(value);
  }

  protected onQuicknessToggleSwitch(value: 'on' | 'off'): void {
    this.quicknessToggleState.set(value);
  }

  private initializeBoonsToggleSwitches(): void {
    if (this.isGenericBoonRequired()) {
      if (this.isAlacrityEffectiveBuild()) {
        this.alacrityToggleState.set('on');
      }
      if (this.isQuicknessEffectiveBuild()) {
        this.quicknessToggleState.set('on');
      }
    }
  }

  private resolvePrimaryBuild(slot: SlotDto): BuildDto {
    const build = structuredClone(slot.requiredBuild);

    if (!this.isGenericBoonRequired()) {
      return build;
    }

    const isQuicknessSelected = this.quicknessToggleState() === 'on';
    const isAlacritySelected = this.alacrityToggleState() === 'on';

    if (isQuicknessSelected && !isAlacritySelected) {
      build.baseRole = this.isGenericHealRequired()
        ? BaseRoleEnum.HealQuick
        : BaseRoleEnum.BoonQuick;
    } else if (!isQuicknessSelected && isAlacritySelected) {
      build.baseRole = this.isGenericHealRequired()
        ? BaseRoleEnum.HealAlac
        : BaseRoleEnum.BoonAlac;
    }

    return build;
  }
}
