import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { ConfigData } from './config/configuration';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService<ConfigData, true>,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
