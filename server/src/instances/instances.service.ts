import { Injectable } from '@nestjs/common';
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
}
