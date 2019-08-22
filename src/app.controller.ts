import { Body, Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { LoggerContext } from './services/logger-context.service';
import { RequestBody } from './interfaces/requestBody.interface';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly loggerContext: LoggerContext,
  ) {}

  @Get('hello')
  async hello(): Promise<string> {
    return new Promise(resolve => {
      setTimeout(() => {
        this.loggerContext.add('businessKey', 'someRandomBusinessValue');
        resolve(this.appService.getHello());
      }, 30000);
    });
  }

  @Get('bye')
  bye(): string {
    return this.appService.getBye();
  }

  @Get('echo/:message')
  echo(@Param('message') message: string): string {
    return this.appService.getEcho(message);
  }

  @Get('name')
  printName(@Body() name: RequestBody): string {
    return this.appService.printName(name.firstName, name.lastName);
  }
}
