import { Module } from '@nestjs/common';
import { FeatureFlagsService } from './featureflags.service';
import { FeatureFlagsController } from './featureflags.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [FeatureFlagsService],
  controllers: [FeatureFlagsController],
})
export class FeatureFlagsModule {}
