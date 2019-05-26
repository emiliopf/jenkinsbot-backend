import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Chat } from './chat.entity';

@Entity()
export class Channel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150, unique: true })
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @Column({ length: 100})
  createdBy: string;

  @Column()
  isActive: boolean = true;

  @OneToMany(type => Chat, chat => chat.channel)
  chats: Chat[];
}
