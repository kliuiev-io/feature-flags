import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Instance } from './Instance.entity';
import { User } from './User.entity';

@Entity('groups')
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => Instance, (instance) => instance.name)
  instance: Instance;

  @ManyToMany(() => User)
  @JoinTable()
  users: User[];
}
