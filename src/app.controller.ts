import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { HttpService } from '@nestjs/axios';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly httpService: HttpService,
  ) {}

  @Post('order')
  handleconsumemessage(@Body() body: any) {
    const avatarurl = body.sender.avatar_url;
    const content = `Hello sir, there is a new commit on 
   Repository: ${body.repository.name} <hr>
     with commit message ${body.head_commit.message}
      <hr> by Auther: ${body.head_commit.author.name} <hr>
      View commit url: ${body.head_commit.url}<hr>
     <hr> View commit message: ${body.head_commit.message}`;
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
