import { UserRole } from '../user.schema';

export class UpdateUserDto {
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  phone?: string;
  role?: UserRole;
}
