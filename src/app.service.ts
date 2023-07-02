import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! Please use /order endpoint to send message to discord webhook url';
  }
}
