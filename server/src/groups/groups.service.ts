import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class GroupsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getGroups(instance: string) {
    return this.databaseService.groupGetGroups(instance);
  }

  async getGroup(groupId: number, instance: string) {
    return this.databaseService.groupGetById(groupId, instance);
  }

  async addGroup(name: string, description: string, instance: string) {
    return this.databaseService.groupAdd({ name, description }, instance);
  }

  async updateGroup(
    groupId: number,
    name: string,
    description: string,
    instance: string,
  ) {
    return this.databaseService.groupUpdate(
      groupId,
      { name, description },
      instance,
    );
  }

  async deleteGroup(groupId: number, instance: string) {
    return this.databaseService.groupDelete(groupId, instance);
  }

  async getFlags(groupId: number, instance: string) {
    return (await this.databaseService.groupGetFlags(groupId, instance)).map(
      (flag) => flag.name,
    );
  }

  async setFlags(groupId: number, instance: string, flags: string[]) {
    return this.databaseService.groupSetFlags(groupId, instance, flags);
  }
}
