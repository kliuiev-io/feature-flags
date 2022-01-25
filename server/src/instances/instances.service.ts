import { Injectable } from '@nestjs/common';
import { FlagBase } from 'src/database/database.interface';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class InstancesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getInstances() {
    return this.databaseService.instanceGetInstances();
  }

  async addInstance(name: string) {
    return this.databaseService.instanceCreate(name);
  }

  async renameInstance(oldName: string, newName: string) {
    return this.databaseService.instanceRename(oldName, newName);
  }

  async deleteInstance(name: string) {
    return this.databaseService.instanceDelete(name);
  }

  async getFlags(instance: string) {
    return this.databaseService.instanceGetFlags(instance);
  }

  async addFlag(flagName: string, instance: string, flagData: FlagBase) {
    return this.databaseService.instanceFlagCreate(
      flagName,
      instance,
      flagData,
    );
  }

  async updateFlag(flagName: string, instance: string, flagData: FlagBase) {
    return this.databaseService.instanceFlagUpdate(
      flagName,
      instance,
      flagData,
    );
  }

  async deleteFlag(flagName: string, instance: string) {
    return this.databaseService.instanceFlagDelete(flagName, instance);
  }
}
