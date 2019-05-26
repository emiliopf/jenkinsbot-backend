import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Channel } from './channel.entity';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150, unique: true })
  uuid: string;

  @Column('text', { nullable: true })
  description: string;

  @Column({ length: 100})
  createdBy: string;

  @Column()
  isActive: boolean = true;

  @ManyToOne(type => Channel, channel => channel.chats, { nullable: false })
  channel: Channel;
}
