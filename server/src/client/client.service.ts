import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ClientService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getFlags(email: string, instance: string) {
    const user = await this.databaseService.userGetByEmail(email, instance);

    const instanceFlags = Object.entries(
      await this.databaseService.instanceGetFlags(instance),
    )
      .filter((entry) => entry[1].defaultState)
      .map((entry) => entry[1].name);

    if (!user) return instanceFlags;

    const userFlags = await this.databaseService.userGetFlags(email, instance);

    const groupFlags = user.groups
      .map((group) => group.flags.map((flag) => flag.name))
      .flat();

    return Array.from(new Set([...userFlags, ...groupFlags, ...instanceFlags]));
  }
}
