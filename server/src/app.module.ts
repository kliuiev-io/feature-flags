import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { InstancesModule } from './instances/instances.module';
import { ClientModule } from './client/client.module';
import { UsersModule } from './users/users.module';
import { GroupsModule } from './groups/groups.module';

@Module({
  imports: [
    DatabaseModule,
    InstancesModule,
    ClientModule,
    UsersModule,
    GroupsModule,
  ],
})
export class AppModule {}
