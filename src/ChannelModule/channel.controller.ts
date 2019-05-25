import { Controller, Get, Post, Body } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { Channel } from './channel.entity';
import { CreateChannelDto } from './dto/create-channel.dto'

@Controller('channel')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Get('/all')
  async findAll(): Promise<Channel[]> {
    return await this.channelService.findAll();
  }

  @Post('/new')
  async create(@Body() data: CreateChannelDto): Promise<Channel> {
    return await this.channelService.create(data);
  }
}