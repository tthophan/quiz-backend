import { ConfigFactory } from '@nestjs/config';
import { config } from 'dotenv';
import { IConfiguration } from './config.interface';

config()
const parseNumber = (input: string, defaultValue: number) => {
    const result = Number(input)
    return Number.isNaN(result) ? defaultValue : result
}
const configuration: IConfiguration = {
    port: parseNumber(process.env.PORT, 80),
    databaseUrl: process.env.DATABASE_URL,
    google0Auth: {
        clientId: process.env.GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        verifyUrl: 'https://www.googleapis.com/oauth2/v3/tokeninfo'
    }
}


const configFunction: ConfigFactory<IConfiguration> = () => configuration
export default configFunction