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

  @Post('order')
  handleconsumemessage(@Body() body: any) {
    const avatarurl = body.sender.avatar_url;
    const content = `Hello sir,
     User ${body.head_commit.author.name} has pushed
     Repository: =>${body.repository.name}
    with commit message ${body.head_commit.message}
    Wanna check out: ${body.head_commit.url}`;
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
