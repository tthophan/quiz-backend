import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { ContextIdFactory, Reflector } from '@nestjs/core'
import { Request } from 'express'
import { LOCAL_AUTHORIZE_KEY } from '../constants'
// import { JwtService, SessionService } from '../services'
import { UnauthorizedException } from '~/common/exception'
import { Session } from '~/common/models'
import { appStorage } from '~/common/storage'
import { GoogleOAuthService } from '../services'

@Injectable()
export class AuthorizeGuard implements CanActivate {
  constructor(
    private ref: Reflector,
    private readonly googleOAuthService: GoogleOAuthService,
    // private readonly jwtService: JwtService,
  ) { }
  async canActivate(context: ExecutionContext) {
    const localAuthData: { isOptional: boolean } =
      this.ref.get(LOCAL_AUTHORIZE_KEY, context.getHandler())
    // case public
    if (!localAuthData) return true

    const request: Request = context.switchToHttp().getRequest()
    const { accessToken } = request.scopeVariable;
    if (!accessToken) throw new UnauthorizedException();

    const ctxId = ContextIdFactory.getByRequest(request)
    const token = await this.googleOAuthService.verifyToken(accessToken)
    request.scopeVariable.session = new Session({
      email: token.email,
      userId: token.sub
    })
    return appStorage.run({ ctxId, request }, () => {
      if (localAuthData.isOptional) return true
      return token.verified
    })
  }
}
