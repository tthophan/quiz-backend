import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { IConfiguration } from '~/common/configuration';
import { GoogleToken } from '../interfaces';

@Injectable()
export class GoogleOAuthService {
  private readonly googleConfig: IConfiguration['google0Auth'];
  constructor(private readonly configService: ConfigService) {
    this.googleConfig =
      configService.get<IConfiguration['google0Auth']>('google0Auth');
  }

  verifyToken = async (
    accessToken: string,
  ): Promise<Partial<GoogleToken> & { valid: boolean }> => {
    try {
      const response = await axios.get<GoogleToken>(
        this.googleConfig.verifyUrl + `?access_token=${accessToken}`,
      );
      const { data: token } = response;
      return {
        ...token,
        valid: token.azp === this.googleConfig.clientId,
      };
    } catch (ex) {
      return {
        valid: false,
      };
    }
  };
}
