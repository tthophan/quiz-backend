import { Body, Controller, Post } from '@nestjs/common';
import { SignInRequestModel, SignUpRequestModel } from '../models';
import { AuthService } from '../services';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Post('social-login')
  // async socialLogin(@Body() payload: any): Promise<string> {
  //   return '';
  // }

  @Post('sign-up')
  async signUp(@Body() payload: SignUpRequestModel) {
    return await this.authService.signUp(payload);
  }

  @Post('sign-in')
  async signIn(@Body() payload: SignInRequestModel) {
    return await this.authService.signIn(payload);
  }
}
