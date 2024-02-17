import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService as BaseJwtService } from '@nestjs/jwt';

import { instanceToPlain } from 'class-transformer';
import jwt from 'jsonwebtoken';
import { IConfiguration } from '~/common/configuration';
import { JwtSession } from '../interfaces';
@Injectable()
export class JwtService {
  private readonly authConfig: IConfiguration['auth'];
  constructor(
    private readonly configService: ConfigService,
    private jwtService: BaseJwtService,
  ) {
    this.authConfig = configService.get<IConfiguration['auth']>('auth');
  }
  async generateToken(payload: JwtSession): Promise<string> {
    const {
      jwtSecret: secret,
      jwtIssuer: issuer,
      jwtExpiresIn: expiresIn,
    } = this.authConfig;
    return await this.jwtService.signAsync(instanceToPlain(payload), {
      secret,
      issuer,
      expiresIn,
    });
  }

  async verifyToken<T extends object>(
    token: string,
  ): Promise<{ valid: boolean; data: T | null }> {
    const { jwtSecret: secret, jwtIssuer: issuer } = this.authConfig;
    try {
      return {
        valid: true,
        data: await this.jwtService.verifyAsync<T>(token, { secret, issuer }),
      };
    } catch (ex) {
      return {
        valid: false,
        data: null,
      };
    }
  }

  decodeToken<T>(token: string, options?: jwt.DecodeOptions) {
    return this.jwtService.decode<T>(token, options);
  }
}
