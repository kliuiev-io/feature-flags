import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ClientService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getFlags(email: string, instance: string) {
    const userFlags = await this.databaseService.userGetFlags(email, instance);

    const user = await this.databaseService.userGetByEmail(email, instance);

    const groupFlags = [];

    for (const group of user.groups) {
      groupFlags.push(
        ...(await this.databaseService.groupGetFlags(group, instance)),
      );
    }

    const instanceFlags = Object.keys(
      await this.databaseService.instanceGetFlags(instance),
    );

    return Array.from(new Set([...userFlags, ...groupFlags, ...instanceFlags]));
  }
}
