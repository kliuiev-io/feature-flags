import { Injectable, NotFoundException } from '@nestjs/common';
import { generateId } from 'src/utils';
import { Flag, Flags, GroupBase, Instances } from './database.interface';

const mockDatabase: Instances = {};

@Injectable()
export class DatabaseService {
  async instanceFlagCheckExists(flagName: string, instance: string) {
    await this.throwIfInstanceDoesNotExist(instance);

    return Boolean(mockDatabase[instance].flags[flagName]);
  }

  async instanceCheckExists(name: string) {
    return typeof mockDatabase[name] !== 'undefined';
  }

  async instanceCreate(name: string) {
    if (await this.instanceCheckExists('name'))
      throw new NotFoundException(`Instance ${name} already exists`);

    mockDatabase[name] = {
      flags: {},
      groups: [],
      users: [],
    };
  }

  async instanceGetInstances() {
    return Object.keys(mockDatabase);
  }

  async instanceFlagGet(flagName: string, instance: string) {
    await this.throwIfInstanceFlagDoesNotExist(flagName, instance);

    return mockDatabase[instance].flags[flagName];
  }

  async instanceFlagCreate(
    flagName: string,
    instance: string,
    { description, defaultState }: Flag,
  ) {
    if (await this.instanceFlagCheckExists(flagName, instance))
      throw new NotFoundException(
        `The flag ${flagName} is already exists in the instance ${instance}`,
      );

    mockDatabase[instance].flags[flagName] = {
      id: generateId(),
      description,
      defaultState,
    };
  }

  async instanceFlagUpdate(
    flagName: string,
    instance: string,
    { description, defaultState }: Flag,
  ) {
    await this.throwIfInstanceFlagDoesNotExist(flagName, instance);

    const flag = mockDatabase[instance].flags[flagName];

    mockDatabase[instance].flags[flagName] = {
      ...flag,
      description: description || flag.description,
      defaultState:
        typeof defaultState === 'boolean' ? defaultState : flag.defaultState,
    };
  }

  async instanceFlagDelete(flagName: string, instance: string) {
    await this.throwIfInstanceFlagDoesNotExist(flagName, instance);

    // TODO: Remove flag from all groups and users

    delete mockDatabase[instance].flags[flagName];
  }

  async instanceGetFlags(name: string) {
    await this.throwIfInstanceDoesNotExist(name);

    return mockDatabase[name].flags;
  }

  private async instanceSetFlags(name: string, flags: Flags) {
    await this.throwIfInstanceDoesNotExist(name);
    mockDatabase[name].flags = flags;
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

  async userCheckExists(email: string, instance: string) {
    return Boolean(await this.userGetByEmail(email, instance));
  }

  async userGetUsers(instance: string) {
    return mockDatabase[instance].users;
  }

  async userGetByEmail(email: string, instance: string) {
    return mockDatabase[instance].users.find((user) => user.email === email);
  }

  async userRegister(email: string, instance: string, groups: string[] = []) {
    if (this.userCheckExists(email, instance))
      throw new NotFoundException(
        `User ${email} already exists in instance ${instance}`,
      );

    mockDatabase[instance].users.push({
      email: email,
      groups,
      flags: [],
    });
  }

  async userDelete(email: string, instance: string) {
    await this.throwIfUserDoesNotExist(email, instance);

    mockDatabase[instance].users = mockDatabase[instance].users.filter(
      (user) => user.email !== email,
    );
  }

  async userGetFlags(email: string, instance: string) {
    const user = await this.userGetByEmail(email, instance);

    return user.flags;
  }

  async userSetFlags(email: string, instance: string, flags: string[]) {
    const user = await this.userGetByEmail(email, instance);

    user.flags = flags;
  }

  async userGetGroups(email: string, instance: string) {
    const user = await this.userGetByEmail(email, instance);

    return user.groups;
  }

  async userSetGroups(email: string, instance: string, groups: string[]) {
    const user = await this.userGetByEmail(email, instance);

    user.groups = groups;
  }

  async groupCheckExists(groupId: string, instance: string) {
    return Boolean(await this.groupGetById(groupId, instance));
  }

  async groupGetById(groupId: string, instance: string) {
    await this.throwIfInstanceDoesNotExist(instance);

    return mockDatabase[instance].groups.find((group) => group.id === groupId);
  }

  async groupGetGroups(instance: string) {
    await this.throwIfInstanceDoesNotExist(instance);

    return mockDatabase[instance].groups;
  }

  async groupAdd({ name, description }: GroupBase, instance: string) {
    await this.throwIfInstanceDoesNotExist(instance);

    mockDatabase[instance].groups.push({
      id: generateId(),
      name,
      description,
      flags: [],
    });
  }

  async groupUpdate(
    groupId: string,
    { name, description }: GroupBase,
    instance: string,
  ) {
    const group = await this.groupGetById(groupId, instance);

    if (name) group.name = name;
    if (description) group.description = description;
  }

  async groupDelete(groupId: string, instance: string) {
    await this.throwIfGroupDoesNotExist(groupId, instance);

    mockDatabase[instance].groups = mockDatabase[instance].groups.filter(
      (group) => group.id !== groupId,
    );
  }

  async groupGetFlags(groupId: string, instance: string) {
    const group = await this.groupGetById(groupId, instance);

    return group.flags;
  }

  async groupSetFlags(groupId: string, instance: string, flags: string[]) {
    const group = await this.groupGetById(groupId, instance);

    group.flags = flags;
  }

  private async throwIfInstanceDoesNotExist(name: string) {
    if (!(await this.instanceCheckExists(name)))
      throw new NotFoundException(`Instance ${name} doesn't exist!`);
  }

  private async throwIfInstanceFlagDoesNotExist(
    flagName: string,
    instance: string,
  ) {
    if (!(await this.instanceFlagCheckExists(flagName, instance)))
      throw new NotFoundException(
        `Flag ${flagName} doesn't exist in instance ${instance}`,
      );
  }

  private async throwIfUserDoesNotExist(email: string, instance: string) {
    if (!(await this.userCheckExists(email, instance)))
      throw new NotFoundException(
        `User ${email} doesn't exist in instance ${instance}`,
      );
  }

  private async throwIfGroupDoesNotExist(groupId: string, instance: string) {
    if (!(await this.groupCheckExists(groupId, instance)))
      throw new NotFoundException(
        `Group ${groupId} doesn't exist in instance ${instance}`,
      );
  }
}
