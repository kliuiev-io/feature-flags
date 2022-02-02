import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { InstancesModule } from './instances/instances.module';
import { ClientModule } from './client/client.module';
import { UsersModule } from './users/users.module';
import { GroupsModule } from './groups/groups.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    DatabaseModule,
    InstancesModule,
    ClientModule,
    UsersModule,
    GroupsModule,
  ],
})
export class AppModule {}
