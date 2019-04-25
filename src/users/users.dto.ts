export class CreateUserDto {
  readonly username: string;
  readonly password: string;
}

export class UpdateUserDto {
  readonly username: string;
  readonly password: string;
  readonly passwordConfirm: string;
}
