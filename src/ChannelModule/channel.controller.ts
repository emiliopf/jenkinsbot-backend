import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { Channel } from './channel.entity';
import { CreateChannelDto } from './dto/create-channel.dto';
import { CreateChatDto } from './dto/create-chat.dto';

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

  @Post(':idChannel/add-chat')
  async addChat(@Param('idChannel') idChannel, @Body() data: CreateChatDto): Promise<Channel> {
    return await this.channelService.addChat(idChannel, data);
  }
}
