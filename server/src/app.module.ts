import { Module } from '@nestjs/common';
import { FeatureFlagsModule } from './featureflags/featureflags.module';
import { DatabaseModule } from './database/database.module';
import { InstancesModule } from './instances/instances.module';

@Module({
  imports: [FeatureFlagsModule, DatabaseModule, InstancesModule],
})
export class AppModule {}
