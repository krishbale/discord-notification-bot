import { Body, Controller, Get, Post, Sse } from '@nestjs/common';
import { AppService } from './app.service';
import { HttpService } from '@nestjs/axios';

interface MessageEvent {
  data: string | object;
}

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly httpService: HttpService,
  ) {}

  @Post('order')
  createorder(@Body() body: any) {
    console.log(body.repository.name);
    const avatarurl = body.sender.avatar_url;
    const content = `New push from ${body.repository.name} <hr>
     with commit message ${body.head_commit.message} by ${body.head_commit.author.name} ${body.head_commit.url} ${body.head_commit.message}`;
    this.httpService
      .post(
        'https://discord.com/api/webhooks/1124927168984645802/E8ZIt-OL39wSweqjiR2aJKCUNPKoRRXlKwmRw5aI2dFa6lyxQ1SlM8SGiipZSecvWpjd',
        {
          content: content,
          embeds: [
            {
              image: {
                url: avatarurl,
              },
            },
          ],
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
