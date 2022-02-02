import { Entity, PrimaryColumn } from 'typeorm';

@Entity('instances')
export class Instance {
  @PrimaryColumn()
  name: string;
}
