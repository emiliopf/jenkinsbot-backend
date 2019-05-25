
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Channel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150, unique: true })
  uuid: string;

  @Column('text')
  description: string;

  @Column({ length: 100})
  createdBy: string;

  @Column()
  isActive: boolean = true;
}
