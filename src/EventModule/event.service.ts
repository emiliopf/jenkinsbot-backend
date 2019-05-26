import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './event.entity';
import { Chat } from './chat.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,
  ) { }

  async findAll(): Promise<Event[]> {
    return await this.eventRepository.find();
  }

  async create(data): Promise<Event> {
    const event = new Event();
    event.code = data.code;
    event.description = data.description;
    event.chats = [];

    try {
      return await this.eventRepository.save(event);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new HttpException({
          message: `Event with code "${event.code}" already exists`,
          code: 'CREATE_EVENT_NAME_DUPLICATE'
        },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        // Logger.error('event.service.create error: ', JSON.stringify(error));
        throw new HttpException({ message: `Internal server error` }, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async addChat(idEvent: string, data): Promise<Event> {
    const event = await this.eventRepository.findOne(idEvent, { relations: ['chats'] });
    console.log(event);
    if (!event) {
      throw new HttpException({
        message: `Event with id "${idEvent}" not found`,
        code: 'ADDCHAT_EVENT_NOT_FOUND',
      },
        HttpStatus.BAD_REQUEST,
      );
    }

    const chat = await this.chatRepository.findOne({ where: { id: data.idChat } });

    if (!chat) {
      throw new HttpException({
        message: `Chat with id "${data.idChat}" not found`,
        code: 'ADDCHAT_CHAT_NOT_FOUND',
      },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!event.chats) {
      event.chats = [chat];
    } else {
      event.chats.push(chat);
    }

    return this.eventRepository.save(event);
  }

  async createChat(data): Promise<Chat> {
    const chat = new Chat();
    chat.uuid = data.uuid;
    chat.description = data.description;

    if (data.event) {
      const event = await this.eventRepository.findOne({ where: { code: data.event } });

      if (!event) {
        throw new HttpException({
          message: `Event with code "${data.event}" not found`,
          code: 'CREATE_CHAT_EVENT_NOT_FOUND'
        },
          HttpStatus.BAD_REQUEST,
        );
      }
      chat.events = [event];
    }

    try {
      return await this.chatRepository.save(chat);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new HttpException({
          message: `Chat with uuid "${chat.uuid}" already exists`,
          code: 'CREATE_CHAT_UUID_DUPLICATE'
        },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException({ message: `Internal server error` }, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
