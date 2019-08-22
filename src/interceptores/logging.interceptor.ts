import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { LoggerContext } from '../services/logger-context.service';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly loggerContext: LoggerContext) {}

  private readonly logger = new Logger(LoggingInterceptor.name);
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const start = Date.now();
    return next.handle().pipe(
      tap(
        () => {
          const end = Date.now();
          const sessionId = context.switchToHttp().getRequest().headers
            .sessionId;

          const params = context.switchToHttp().getRequest().params;
          const body = context.switchToHttp().getRequest().body;
          const contextInfo = this.loggerContext.context;
          const paramsMessage = this.paramsFromObject(params);
          const bodyMessage = this.paramsFromObject(body);
          const contextMessage = this.paramsFromObject(contextInfo);

          this.logger.log(
            `[${context.getClass().name}] [url=${
              context.switchToHttp().getRequest().url
            }] ${paramsMessage}${bodyMessage} [executionTime=${end -
              start}ms] [sessionId=${sessionId}] ${contextMessage}`,
          );
        },
      ),
      catchError((error, caught) => {
        console.log('errorrr');
        console.log(error);
        throw error;
      }),
    );
  }

  public paramsFromObject(obj: any): string {
    if (obj === {}) {
      return '';
    }
    const result = Object.keys(obj).reduce(
      (message: string, paramKey: string) => {
        message += `[${paramKey}=${obj[paramKey]}] `;
        return message;
      },
      '',
    );
    return result.substr(0, result.length - 1);
  }
}
