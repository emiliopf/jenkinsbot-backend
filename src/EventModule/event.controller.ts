import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { EventService } from './event.service';
import { Event } from './event.entity';
import { Chat } from './chat.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { CreateChatDto } from './dto/create-chat.dto';
import { AddChatDto } from './dto/add-chat.dto';

@Controller()
export class EventController {
  constructor(private readonly eventService: EventService) { }

  @Get('event/all')
  async findAll(): Promise<Event[]> {
    return await this.eventService.findAll();
  }

  @Post('event/new')
  async create(@Body() data: CreateEventDto): Promise<Event> {
    return await this.eventService.create(data);
  }

  @Post('event/:idEvent/add-chat')
  async addChat(@Param('idEvent') idEvent: string, @Body() data: AddChatDto): Promise<Event> {
    return await this.eventService.addChat(idEvent, data);
  }

  @Post('event/:idEvent/remove-chat')
  async removeChat(@Param('idEvent') idEvent: string, @Body() data: AddChatDto): Promise<Event> {
    return await this.eventService.removeChat(idEvent, data);
  }
  @Post('chat/new')
  async createChat(@Body() data: CreateChatDto): Promise<Chat> {
    return await this.eventService.createChat(data);
  }

  @Get('event/:idEvent/chats')
  async findChatsByEvent(@Param('idEvent') idEvent: string): Promise<Chat[]> {
    return await this.eventService.findChatsByEvent(idEvent);
  }
}
