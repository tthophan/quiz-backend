import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BaseService } from '~/common/bases';
import { IConfiguration } from '~/common/configuration';
import { BusinessException } from '~/common/exception';
import { CommonHelpers } from '~/common/helpers';
import { UserQueries, UserRepository } from '~/modules/shared';
import { SignInRequestModel, SignUpRequestModel } from '../models';
import { JwtService } from './jwt.service';

@Injectable()
export class AuthService extends BaseService {
  private readonly authConfig: IConfiguration['auth'];
  constructor(
    private readonly configService: ConfigService,
    private readonly userQueries: UserQueries,
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {
    super();
    this.authConfig = configService.get<IConfiguration['auth']>('auth');
  }

  async signUp(payload: SignUpRequestModel) {
    const phoneHash = CommonHelpers.aes256(
      payload.phone,
      this.authConfig.aes256Secret,
      this.authConfig.aes256CipherIV,
    );
    const checkUser = await this.userQueries.findUnique({
      where: {
        phone: phoneHash,
      },
    });
    if (checkUser) throw new BusinessException('AUTH_PHONE_NUMBER_EXISTS');

    const passwordSecure = CommonHelpers.uuid();
    await this.userRepository.create({
      data: {
        phone: phoneHash,
        passwordSecure,
        password: CommonHelpers.sha256(payload.password, passwordSecure),
        fullName: payload.fullName,
      },
    });
  }

  async signIn(payload: SignInRequestModel) {
    const phoneHash = CommonHelpers.aes256(
      payload.phone,
      this.authConfig.aes256Secret,
      this.authConfig.aes256CipherIV,
    );
    const user = await this.userQueries.findUnique({
      where: {
        phone: phoneHash,
      },
    });
    if (!user) throw new BusinessException('AUTH_WRONG_PASSWORD');
    const passwordHash = CommonHelpers.sha256(
      payload.password,
      user.passwordSecure,
    );

    if (passwordHash !== user.password)
      throw new BusinessException('AUTH_WRONG_PASSWORD');

    const [jwt] = await Promise.all([
      await this.jwtService.generateToken({
        userId: user.id.toString(),
        email: 'quiz@gmail.com',
      }),
      await this.userRepository.update({
        data: {
          latestSignedTime: new Date(),
        },
        where: {
          id: user.id,
        },
      }),
    ]);
    return {
      jwt,
      userInfo: {
        id: user.id.toString(),
        name: user.fullName,
        email: 'quiz@gmail.com',
        image: '',
      },
    };
  }
}
