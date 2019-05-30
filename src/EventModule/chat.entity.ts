import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Event } from './event.entity';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150, unique: true })
  uuid: string;

  @Column('text', { nullable: true })
  description: string;

  @Column()
  isActive: boolean = true;

  @Column()
  isGroup: boolean = true;

  @ManyToMany(type => Event, event => event.chats)
  events: Event[];
}
