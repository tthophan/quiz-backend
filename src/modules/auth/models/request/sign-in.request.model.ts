import { IsString } from 'class-validator';

export class SignInRequestModel {
  @IsString()
  phone: string;

  @IsString()
  password: string;
}
