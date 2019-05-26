import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Channel } from './channel.entity';
import { Chat } from './chat.entity';

@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(Channel)
    private readonly channelRepository: Repository<Channel>,
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,
  ) {}

  async findAll(): Promise<Channel[]> {
    return await this.channelRepository.find();
  }

  async create(channelData): Promise<Channel> {
    const channel = new Channel();
    channel.name = channelData.name;
    channel.description = channelData.description;
    channel.createdBy = channelData.createdBy;
    channel.chats = [];

    try {
      return await this.channelRepository.save(channel);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new HttpException({
          message: `Channel with name "${channel.name}" already exists`,
          code: 'CREATE_CHANNEL_NAME_DUPLICATE'},
          HttpStatus.BAD_REQUEST,
        );
      } else {
        // Logger.error('channel.service.create error: ', JSON.stringify(error));
        throw new HttpException({message: `Internal server error`}, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async addChat(idChannel: string, chatData): Promise<Channel> {
    let channel = await this.channelRepository.findOne(idChannel);

    const chat = new Chat();
    chat.uuid  = chatData.uuid;
    chat.description = chatData.description;
    chat.createdBy = chatData.createdBy;
    chat.channel = channel;

    if (channel.chats) {
      channel.chats.push(chat);
    } else {
      channel.chats = [chat];
    }

    await this.chatRepository.save(chat);
    channel = await this.channelRepository.findOne(idChannel);

    return channel;
  }
}
