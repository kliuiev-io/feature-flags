import { Module } from '@nestjs/common';
import { FeatureFlagsService } from './featureflags.service';
import { FeatureFlagsController } from './featureflags.controller';

@Module({
  providers: [FeatureFlagsService],
  controllers: [FeatureFlagsController]
})
export class FeatureFlagsModule {}
