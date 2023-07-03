import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { HttpService } from '@nestjs/axios';
import { DISCORD_WEBHOOK_URL } from './constant';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly httpService: HttpService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('chatbot')
  handlechatbotmessage(@Body() body: any) {
    const response =
      "Hi, I'm a  chatbot. I'm here to help you. How can I help you?";
    //message to lowercase
    console.log(body);
    const message = body.message.message.toLowerCase();
    if (message.inclues('Hi' || 'Hello' || 'Hey' || 'Hey there' || 'Hey bot')) {
      this.httpService
        .post(DISCORD_WEBHOOK_URL, {
          response,
        })
        .subscribe({
          complete: () => {
            console.log('completed');
          },
          error: (err) => {
            console.log(err);
          },
        });
    } else {
      const alternateResponse =
        'Sorry, I did not understand that. Please try again';
      this.httpService
        .post(
          //azure webhook url if available
          DISCORD_WEBHOOK_URL,
          {
            alternateResponse,
          },
        )
        .subscribe({
          complete: () => {
            console.log('completed');
          },
          error: (err) => {
            console.log(err);
          },
        });
      return { message: 'ok' };
    }
  }

  @Post('order')
  handleconsumemessage(@Body() body: any) {
    const user = body.sender.login;
    const repo = body.repository.name;
    const commitmessage = body.head_commit.message;
    const commiturl = body.head_commit.url;
    const avatarurl2 = body.sender.avatar_url;
    this.httpService
      .post(
        //azure webhook url if available
        DISCORD_WEBHOOK_URL,

        {
          user,
          repo,
          commitmessage,
          commiturl,
          avatarurl2,
        },
      )
      .subscribe({
        complete: () => {
          console.log('completed');
        },
        error: (err) => {
          console.log(err);
        },
      });
    return { message: 'ok' };
  }
}
