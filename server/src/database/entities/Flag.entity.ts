import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Instance } from './Instance.entity';

@Entity('flags')
export class Flag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  defaultState: boolean;

  @ManyToOne(() => Instance, (instance) => instance.name)
  instance: Instance;
}
