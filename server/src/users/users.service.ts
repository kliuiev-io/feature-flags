import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getUsers(instance: string) {
    return this.databaseService.userGetUsers(instance);
  }

  async registerUser(email: string, instance: string) {
    return this.databaseService.userRegister(email, instance);
  }

  async deleteUser(email: string, instance: string) {
    return this.databaseService.userDelete(email, instance);
  }

  async getGroups(email: string, instance: string) {
    return this.databaseService.userGetGroups(email, instance);
  }

  async setGroups(email: string, instance: string, groups: string[]) {
    return this.databaseService.userSetGroups(email, instance, groups);
  }

  async getFlags(email: string, instance: string) {
    return this.databaseService.userGetFlags(email, instance);
  }

  async setFlags(email: string, instance: string, flags: string[]) {
    return this.databaseService.userSetFlags(email, instance, flags);
  }
}
