import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class GroupsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getGroups(instance: string) {
    return this.databaseService.groupGetGroups(instance);
  }

  async getGroup(groupId: string, instance: string) {
    return this.databaseService.groupGetById(groupId, instance);
  }

  async addGroup(name: string, description: string, instance: string) {
    this.databaseService.groupAdd({ name, description }, instance);
  }

  async updateGroup(
    groupId: string,
    name: string,
    description: string,
    instance: string,
  ) {
    this.databaseService.groupUpdate(groupId, { name, description }, instance);
  }

  async deleteGroup(groupId: string, instance: string) {
    this.databaseService.groupDelete(groupId, instance);
  }

  async getFlags(groupId: string, instance: string) {
    return this.databaseService.groupGetFlags(groupId, instance);
  }

  async setFlags(groupId: string, instance: string, flags: string[]) {
    this.databaseService.groupSetFlags(groupId, instance, flags);
  }
}
