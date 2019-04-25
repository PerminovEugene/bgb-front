export enum UserRole {
  superadmin = 'superadmin',
  admin = 'admin',
  customer = 'customer',
}

export enum UserStatus {
  active = 'active',
}

export interface PublicUser {
  email: string;
  role: UserRole;
  status: UserStatus;
}

export interface CreateUser extends PublicUser {
  password: string;
  salt: string;
}

export interface CreatedUser extends PublicUser {}
