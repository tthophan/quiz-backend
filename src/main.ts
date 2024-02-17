import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { IConfiguration } from './common/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
  });
  const configService = app.get(ConfigService);
  app.setGlobalPrefix('api/v1');
  const port = configService.get<IConfiguration['port']>('port');
  await app.listen(port);
  console.debug(`Application listen on ${await app.getUrl()}`);
}
bootstrap();
