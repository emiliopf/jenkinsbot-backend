import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Chat } from './chat.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150, unique: true })
  code: string;

  @Column('text', { nullable: true })
  description: string;

  @Column()
  isActive: boolean = true;

  @ManyToMany(type => Chat, chat => chat.events)
  @JoinTable({
    name: 'events_chats',
    joinColumn: {
      name: 'event',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'chat',
      referencedColumnName: 'id',
    },
  })
  chats: Chat[];

  
}
