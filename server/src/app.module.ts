import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeatureFlagsModule } from './featureflags/featureflags.module';

@Module({
  imports: [FeatureFlagsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
