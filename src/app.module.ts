import { Module, Scope } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoginSimulatorInterceptor } from './interceptores/login-simulator.interceptor';
import { LoggingInterceptor } from './interceptores/logging.interceptor';
import { LoggerContext } from './services/logger-context.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoginSimulatorInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      scope: Scope.REQUEST,
      useClass: LoggingInterceptor,
    },
    LoggerContext,
  ],
})
export class AppModule {}
