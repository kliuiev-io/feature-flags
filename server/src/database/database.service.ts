import { Injectable, NotFoundException } from '@nestjs/common';

type TFlags = { [key: string]: boolean };
type TInstances = { [key: string]: TFlags }

const mockDatabase: TInstances = {};

@Injectable()
export class DatabaseService {
  async flagCheckExists(flagName: string, instance: string) {
    await this.throwIfInstanceDoesNotExist(instance);

    return typeof mockDatabase[instance][flagName] === 'boolean'
  }

  async flagGet(flagName: string, instance: string) {
    await this.throwIfFlagDoesNotExist(flagName, instance);

    return mockDatabase[instance][flagName];
  }

  async flagSet(flagName: string, value: boolean, instance: string) {
    await this.throwIfInstanceDoesNotExist(instance);

    mockDatabase[instance][flagName] = value;
  }

  async flagDelete(flagName: string, instance: string) {
    await this.throwIfFlagDoesNotExist(flagName, instance);

    delete mockDatabase[instance][flagName];
  }

  async instanceCheckExists(name: string) {
    return typeof mockDatabase[name] !== 'undefined';
  }

  async instanceCreate(name: string) {
    if (await this.instanceCheckExists('name'))
      throw new NotFoundException(`Instance ${name} already exists`);

    mockDatabase[name] = {};
  }

  async instanceGetFlags(name: string) {
    await this.throwIfInstanceDoesNotExist(name);

    return mockDatabase[name];
  }

  async instanceSetFlags(name: string, flags: TFlags) {
    await this.throwIfInstanceDoesNotExist(name);
    mockDatabase[name] = flags;
  }

  async instanceDelete(name: string) {
    await this.throwIfInstanceDoesNotExist(name);
    delete mockDatabase[name];
  }

  async instanceRename(oldName: string, newName: string) {
    const flags = await this.instanceGetFlags(oldName);
    await this.instanceCreate(newName);
    await this.instanceSetFlags(newName, flags);
    await this.instanceDelete(oldName);
  }

  private async throwIfInstanceDoesNotExist(name: string) {
    if (!await this.instanceCheckExists(name)) throw new NotFoundException(`Instance ${name} doesn't exist!`);
  }

  private async throwIfFlagDoesNotExist(flagName: string, instance: string) {
    if (!await this.flagCheckExists(flagName, instance)) throw new NotFoundException(`Flag ${flagName} doesn't exist in instance ${instance}`);
  }
}
