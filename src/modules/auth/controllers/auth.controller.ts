import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    constructor() { }

    @Post('social-login')
    async socialLogin(
        @Body() payload: any
    ): Promise<string> {
        return ''
    }
}
