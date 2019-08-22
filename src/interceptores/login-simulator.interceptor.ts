import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class LoginSimulatorInterceptor implements NestInterceptor {

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    if(!context.switchToHttp().getRequest().headers.sessionId) {
      context.switchToHttp().getRequest().headers.sessionId = 'randomSessionId';
    }
    return next.handle()
  }

}
