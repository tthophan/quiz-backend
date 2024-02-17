export interface IConfiguration {
    port: number
    databaseUrl: string
    google0Auth: {
        clientId: string
        clientSecret: string
        verifyUrl: string
    }
}
