export class Session {
  userId: string;
  email: string;
  fullName: string;

  constructor(data: Partial<Session>) {
    Object.assign(this, data);
  }
}

export class ScopeVariable {
  accessToken?: string;

  refreshToken?: string;

  appName?: string;

  appBuildNumber?: number | string;

  requestId?: string;

  // session
  session?: Session;

  hash?: string;

  deviceId?: string;

  platform?: string;

  platformVersion?: string;

  [key: string]: unknown;

  constructor(data?: Partial<ScopeVariable>) {
    Object.assign(this, data);
  }
}
