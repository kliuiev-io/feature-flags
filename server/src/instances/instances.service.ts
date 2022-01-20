import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class InstancesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async addInstance(name: string) {
    await this.databaseService.instanceCreate(name);
  }

  async renameInstance(oldName: string, newName: string) {
    await this.databaseService.instanceRename(oldName, newName);
  }

  async deleteInstance(name: string) {
    await this.databaseService.instanceDelete(name);
  }
}
