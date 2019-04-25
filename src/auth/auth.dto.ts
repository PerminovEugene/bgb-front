export class SignInDto {
  readonly username: string;
  readonly password: string;
}

export class SignUpDto {
  readonly username: string;
  readonly password: string;
  readonly passwordConfirmation: string;
}
