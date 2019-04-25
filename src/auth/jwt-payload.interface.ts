import { UserRole } from '../users/users.interfaces';
export interface JwtPayload {
  email: string;
  role: UserRole;
}
