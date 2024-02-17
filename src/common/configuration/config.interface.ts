export interface IConfiguration {
  port: number;
  databaseUrl: string;
  google0Auth: {
    clientId: string;
    clientSecret: string;
    verifyUrl: string;
  };
  auth: {
    aes256Secret: string;
    aes256CipherIV: string;
    jwtSecret: string;
    jwtIssuer: string;
    jwtExpiresIn: number;
  };
}
