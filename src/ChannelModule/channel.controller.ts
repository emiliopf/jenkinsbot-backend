import { Controller, Get } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { Channel } from './channel.entity';

@Controller('channel')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Get('/all')
  async findAll(): Promise<Channel[]> {
    return await this.channelService.findAll();
  }
}