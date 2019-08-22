import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getBye(): string {
    return 'Bye!';
  }
  getEcho(message): string {
    return `Echo: ${message}`;
  }
  printName(firstName: string, lastName: string): string {
    return `${lastName}, ${firstName}`;
  }
  printRandom(random: number): string {
    return `Random: ${random}`;
  }
}
