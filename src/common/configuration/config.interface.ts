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
    jwtSecret: string;
    jwtIssuer: string;
    jwtExpiresIn: number;
  };
}
