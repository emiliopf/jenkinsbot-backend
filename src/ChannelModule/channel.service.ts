
import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Channel } from './channel.entity';

@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(Channel)
    private readonly channelRepository: Repository<Channel>,
  ) {}

  async findAll(): Promise<Channel[]> {
    return await this.channelRepository.find();
  }

  async create(channelData): Promise<Channel> {
    const channel = new Channel();
    channel.uuid = channelData.uuid;
    channel.description = channelData.description;
    channel.createdBy = channelData.createdBy;

    try {
      return await this.channelRepository.save(channel);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new HttpException({
          message: `Channel with ${channel.uuid} already exists`,
          code: 'CREATE_CHANNEL_UUID_DUPLICATE'},
          HttpStatus.BAD_REQUEST,
        );
      } else {
        // Logger.error('channel.service.create error: ', JSON.stringify(error));
        throw new HttpException({message: `Internal server error`}, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
