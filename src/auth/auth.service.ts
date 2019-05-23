import { JwtService } from '@nestjs/jwt';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtPayload } from './jwt-payload.interface';
import * as bcrypt from 'bcrypt';
import { UserRole, UserStatus, CreatedUser } from '../users/users.interfaces';
import { UsersService } from '../users/users.service';
import { SignInDto, SignUpDto } from './auth.dto';
import { Users } from '../users/users.entity';

const SALT_ROUNDS = 5;

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  public async signUp(body: SignUpDto): Promise<string> {
    this.handlePasswordConfirmation(body.password, body.passwordConfirmation);
    const salt = await this.generateSalt();
    const cipherPassword = await this.hashText(body.password, salt);

    const user: CreatedUser = await this.userService.create({
      email: body.email,
      password: cipherPassword,
      salt,
      role: UserRole.customer,
      status: UserStatus.active
    });

    return this.jwtService.sign(JSON.stringify(user));
  }

  public async signIn(body: SignInDto): Promise<string> {
    const user: Users = await this.userService.findByEmail(body.email);
    const passwordValid = await this.isPasswordCorrect(user, body.password);
    if (!user || !passwordValid) {
      throw new HttpException({ message: 'User not found' }, HttpStatus.NOT_FOUND);
    }
    return this.jwtService.sign(JSON.stringify(user));
  }

  public async validateUser(payload: JwtPayload): Promise<any> {
    return await this.userService.findByEmail(payload.email);
  }

  public async isPasswordCorrect(user: Users, password: string) {
    const cipherPassword = await this.hashText(password, user.salt);
    return cipherPassword === user.password;
  }

  public async generateSalt(): Promise<string> {
    return await bcrypt.genSalt(SALT_ROUNDS);
  }

  public async hashText(myPlaintextPassword: string, salt: string): Promise<string> {
    return await bcrypt.hash(myPlaintextPassword, salt);
  }

  public handlePasswordConfirmation(password: string, passwordConfirmation: string): void {
    if (password !== passwordConfirmation) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Password and Password confirmation should be equal'
        },
        400
      );
    }
  }
}
