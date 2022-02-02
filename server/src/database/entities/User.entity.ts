import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Group } from './Group.entity';
import { Instance } from './Instance.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @ManyToOne(() => Instance, (instance) => instance.name)
  instance: Instance;

  @ManyToMany(() => Group)
  @JoinTable()
  groups: Group[];
}
