import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeatureFlagsModule } from './featureflags/featureflags.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [FeatureFlagsModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
