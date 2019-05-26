
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelService } from './channel.service';
import { ChannelController } from './channel.controller';
import { Channel } from './channel.entity';
import { Chat } from './chat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Channel, Chat])],
  providers: [ChannelService],
  controllers: [ChannelController],
})
export class ChannelModule {}
