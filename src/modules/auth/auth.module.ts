import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controllers';
import { AuthService, GoogleOAuthService, JwtService } from './services';

@Module({
  imports: [JwtModule],
  controllers: [AuthController],
  providers: [GoogleOAuthService, AuthService, JwtService],
  exports: [GoogleOAuthService, AuthService, JwtService],
})
export class AuthModule {}
