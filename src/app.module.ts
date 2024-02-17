import configuration from '@config/config';
import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ExceptionsFilter } from './common/filters';
import { CoreResponseInterceptor } from './common/interceptors';
import { ScopeVariableMiddleware } from './common/middlewares';
import { PrismaModule } from './common/prisma';
import { AuthModule } from './modules/auth';
import { AuthorizeGuard } from './modules/auth/guards';
import { QuizzesModule } from './modules/quizzes';
import { SharedModule } from './modules/shared';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    PrismaModule,
    SharedModule,
    AuthModule,
    QuizzesModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useFactory: () =>
        new ValidationPipe({
          transform: true,
          whitelist: true,
          validationError: {
            target: false,
            value: false,
          },
          stopAtFirstError: true,
        }),
    },
    {
      provide: APP_GUARD,
      useClass: AuthorizeGuard
    },
    {
      provide: APP_FILTER,
      useClass: ExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CoreResponseInterceptor,
    }
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ScopeVariableMiddleware).forRoutes('*')
  }
}
