import { BuildDto } from '@/api';
import BaseRoleEnum = BuildDto.BaseRoleEnum;

export const GENERIC_ROLES: BaseRoleEnum[] = [
  BaseRoleEnum.GenericBoonDps,
  BaseRoleEnum.GenericHeal,
];

export const ALACRITY_ROLES: BaseRoleEnum[] = [
  BaseRoleEnum.HealAlac,
  BaseRoleEnum.BoonAlac,
];

export const QUICKNESS_ROLES: BaseRoleEnum[] = [
  BaseRoleEnum.HealQuick,
  BaseRoleEnum.BoonQuick,
];
