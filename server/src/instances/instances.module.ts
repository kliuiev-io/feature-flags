import { Module } from '@nestjs/common';
import { InstancesService } from './instances.service';
import { InstancesController } from './instances.controller';

@Module({
  providers: [InstancesService],
  controllers: [InstancesController]
})
export class InstancesModule {}
