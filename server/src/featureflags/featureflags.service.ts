import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class FeatureFlagsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async checkFlag(flagName: string) {
    return this.databaseService.flagGet(flagName); 
  }

  async setFlag(flagName: string, value: boolean) {
    await this.databaseService.flagSet(flagName, value);
  }

  async deleteFlag(flagName: string) {
    await this.databaseService.flagDelete(flagName);
  }
}
