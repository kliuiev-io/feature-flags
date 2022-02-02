import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Flag } from './Flag.entity';
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

  @ManyToOne(() => Instance, (instance) => instance.name, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  instance: Instance;

  @ManyToMany(() => User, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinTable()
  users: User[];

  @ManyToMany(() => Flag, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinTable()
  flags: Flag[];
}
