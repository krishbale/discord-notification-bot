import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { HttpService } from '@nestjs/axios';
import { DISCORD_WEBHOOK_URL } from './constant';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly httpService: HttpService,
  ) {}

  @Post('order')
  handleconsumemessage(@Body() body: any) {
    console.log(body);
    const avatarurl = body.sender.avatar_url;
    const content = `Hello sir, there is a new commit on 
   Repository: ${body.repository.name} <hr>
     with commit message ${body.head_commit.message}
      <hr> by Auther: ${body.head_commit.author.name} <hr>
      View commit url: ${body.head_commit.url}<hr>
     <hr> View commit message: ${body.head_commit.message}`;
    this.httpService
      .post(
        //azure webhook url if available
        DISCORD_WEBHOOK_URL,

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
