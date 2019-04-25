import { Controller, Post, Body, UseGuards, Res } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { SignUpDto, SignInDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  public async create(@Body() signUpDto: SignUpDto, @Res() res: any) {
    const token: string = await this.authService.signUp(signUpDto);
    this.addJwtToResponse(res, token);
    return res.status(HttpStatus.OK).send();
  }

  @Post('sign-in')
  public async login(@Body() signInDto: SignInDto, @Res() res) {
    const token: string = await this.authService.signIn(signInDto);
    this.addJwtToResponse(res, token);
    return res.status(HttpStatus.OK).send();
  }

  /**
   * If you really need to save token in black list, start here
   */
  // @Post('sign-out')
  // @UseGuards(AuthGuard())
  // public async signOut() {
  //   return 'Save token in black list';
  // }

  private addJwtToResponse = (res: any, token: string) => {
    res.set('Authorization', `Bearer ${token}`);
  };
}
