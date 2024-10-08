import { UserRole } from '../user.schema';

export class CreateUserDto {
  firstName: string;
  lastName: string;
  password: string;
  phone: string;
  role: UserRole;
}
