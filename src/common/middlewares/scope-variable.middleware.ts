import { Injectable, NestMiddleware } from '@nestjs/common';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';
import { NextFunction, Request } from 'express';
import { HeaderKeys } from '../constants';
import { CommonHelpers } from '../helpers';
import { ScopeVariable } from '../models';
import { appStorage } from '../storage';

@Injectable()
export class ScopeVariableMiddleware implements NestMiddleware {
  constructor(private moduleRef: ModuleRef) {}
  use(request: Request, res: Response, next: NextFunction) {
    const scopeVariable: ScopeVariable = new ScopeVariable({
      accessToken: request.header(HeaderKeys.AccessToken.toLowerCase()),
      refreshToken: request.header(HeaderKeys.RefreshToken.toLowerCase()),
      appName: request.header(HeaderKeys.AppName.toLowerCase()),
      appBuildNumber: request.header(HeaderKeys.AppBuildNumber.toLowerCase()),
      requestId: request.header(HeaderKeys.RequestId.toLowerCase()),
      hash: request.header(HeaderKeys.HashKey.toLowerCase()),
      deviceId: request.header(HeaderKeys.DeviceId.toLowerCase()),
    });

    if (!scopeVariable.accessToken)
      scopeVariable.accessToken = request
        .header('Authorization')
        ?.split(' ')
        .pop();

    if (!scopeVariable.requestId)
      scopeVariable.requestId = CommonHelpers.uuid();

    request.scopeVariable = scopeVariable;
    const ctxId = ContextIdFactory.getByRequest(request);
    this.moduleRef.registerRequestByContextId(request, ctxId);

    appStorage.run({ ctxId, request }, () => {
      next();
    });
  }
}
