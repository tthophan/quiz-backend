import { IsString } from 'class-validator';

export class SignUpRequestModel {
  @IsString()
  fullName: string;

  @IsString()
  phone: string;

  @IsString()
  password: string;
}
