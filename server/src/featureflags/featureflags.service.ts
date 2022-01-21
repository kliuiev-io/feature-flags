import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class FeatureFlagsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getFlags(instance: string) {
    return this.databaseService.instanceGetFlags(instance);
  }

  async checkFlag(flagName: string, instance: string) {
    return this.databaseService.flagGet(flagName, instance);
  }

  async setFlag(flagName: string, value: boolean, instance: string) {
    await this.databaseService.flagSet(flagName, value, instance);
  }

  async deleteFlag(flagName: string, instance: string) {
    await this.databaseService.flagDelete(flagName, instance);
  }
}
