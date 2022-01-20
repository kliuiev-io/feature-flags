import { Injectable, NotFoundException } from '@nestjs/common';

const mockDatabase: { [key: string]: boolean } = {};

@Injectable()
export class DatabaseService {
  async flagCheckExists(flagName: string) {
    return typeof mockDatabase[flagName] === 'boolean'
  }

  async flagGet(flagName: string) {
    if (!this.flagCheckExists(flagName)) throw new NotFoundException();

    return mockDatabase[flagName];
  }

  async flagSet(flagName: string, value: boolean) {
    mockDatabase[flagName] = value;
  }

  async flagDelete(flagName: string) {
    if (!this.flagCheckExists(flagName)) throw new NotFoundException();

    delete mockDatabase[flagName];
  }
}
