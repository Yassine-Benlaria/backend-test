import { SetMetadata } from '@nestjs/common';

export const SetAllowedRoles = (...roles: string[]) =>
  SetMetadata('roles', roles);
