import { Injectable } from '@nestjs/common';
import { LoggerContext } from './services/logger-context.service';

const RESULT_KEY = 'result';
@Injectable()
export class AppService {

  constructor(private readonly loggerContext: LoggerContext) {}

  getHello(): string {
    const result = 'Hello World';
    this.loggerContext.add(RESULT_KEY, result)
    return result;
  }
  getBye(): string {
    const result = 'Bye!';
    this.loggerContext.add(RESULT_KEY, result)
    return result;
  }
  getEcho(message): string {
    const result = `echo ${message}`;
    this.loggerContext.add(RESULT_KEY, result)
    return result;
  }
  printName(firstName: string, lastName: string): string {
    const result = `${lastName}, ${firstName}`;
    this.loggerContext.add(RESULT_KEY, result)
    return result;
  }
}
