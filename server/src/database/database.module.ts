import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseService } from './database.service';
import { Flag } from './entities/Flag.entity';
import { Group } from './entities/Group.entity';
import { Instance } from './entities/Instance.entity';
import { User } from './entities/User.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Flag, User, Group, Instance])],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
