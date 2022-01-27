import { BadRequestException } from '@nestjs/common';
import {
  validateEmailRegexp,
  validateFlagNameRegexp,
  validateInstanceNameRegexp,
} from './constants';

export const generateId = () => Math.random().toString(36).substr(2);

export function validateEmail(email: string) {
  if (!validateEmailRegexp.test(email))
    throw new BadRequestException(`Invalid email ${email}`);
}

export function validateFlagName(flagName: string) {
  if (!validateFlagNameRegexp.test(flagName))
    throw new BadRequestException(`Invalid flag name ${flagName}`);
}

export function validateInstanceName(instance: string) {
  if (!validateInstanceNameRegexp.test(instance))
    throw new BadRequestException(`Invalid instance name ${instance}`);
}
