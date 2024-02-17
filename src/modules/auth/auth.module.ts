import { Module } from '@nestjs/common';
import { AuthController } from './controllers';
import { GoogleOAuthService } from './services';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [GoogleOAuthService],
  exports: [GoogleOAuthService]
})
export class AuthModule { }
