import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { Flag } from './Flag.entity';
import { Group } from './Group.entity';
import { Instance } from './Instance.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @ManyToOne(() => Instance, (instance) => instance.name, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  instance: Instance;

  @ManyToMany(() => Group, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinTable()
  groups: Group[];

  @ManyToMany(() => Flag, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinTable()
  flags: Flag[];
}
