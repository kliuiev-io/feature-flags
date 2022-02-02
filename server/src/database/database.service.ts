import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  generateId,
  validateEmail,
  validateFlagName,
  validateInstanceName,
} from 'src/utils';
import { Repository } from 'typeorm';
import { FlagBase, Flags, GroupBase } from './database.interface';
import { Flag } from './entities/Flag.entity';
import { Group } from './entities/Group.entity';
import { Instance } from './entities/Instance.entity';
import { User } from './entities/User.entity';

@Injectable()
export class DatabaseService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Group)
    private readonly groupsRepository: Repository<Group>,
    @InjectRepository(Instance)
    private readonly instancesRepository: Repository<Instance>,
    @InjectRepository(Flag) private readonly flagsRepository: Repository<Flag>,
  ) {}

  async instanceFlagCheckExists(flagName: string, instance: string) {
    await this.throwIfInstanceDoesNotExist(instance);

    return Boolean(
      await this.flagsRepository.findOne({
        where: { instance: { name: instance }, name: flagName },
      }),
    );
  }

  async instanceCheckExists(name: string) {
    return Boolean(this.instancesRepository.findOne(name));
  }

  async instanceCreate(name: string) {
    validateInstanceName(name);

    if (await this.instanceCheckExists('name'))
      throw new NotFoundException(`Instance ${name} already exists`);

    await this.instancesRepository.create({ name });
  }

  async instanceGetInstances() {
    return this.instancesRepository.find();
  }

  async instanceFlagGet(flagName: string, instance: string) {
    await this.throwIfInstanceFlagDoesNotExist(flagName, instance);

    return this.flagsRepository.findOne({
      instance: { name: instance },
      name: flagName,
    });
  }

  async instanceFlagCreate(
    flagName: string,
    instance: string,
    { description, defaultState }: FlagBase,
  ) {
    validateFlagName(flagName);

    if (await this.instanceFlagCheckExists(flagName, instance))
      throw new NotFoundException(
        `The flag ${flagName} is already exists in the instance ${instance}`,
      );

    await this.flagsRepository.create({
      name: flagName,
      description,
      instance: { name: instance },
      defaultState,
    });
  }

  async instanceFlagUpdate(
    flagName: string,
    instance: string,
    { description, defaultState }: FlagBase,
  ) {
    await this.throwIfInstanceFlagDoesNotExist(flagName, instance);

    const flag = await this.instanceFlagGet(flagName, instance);

    await this.flagsRepository.update(
      { instance: { name: instance }, name: flagName },
      {
        description: description || flag.description,
        defaultState:
          typeof defaultState === 'boolean' ? defaultState : flag.defaultState,
      },
    );
  }

  async instanceFlagDelete(flagName: string, instance: string) {
    await this.throwIfInstanceFlagDoesNotExist(flagName, instance);

    // TODO: Remove flag from all groups and users

    await this.flagsRepository.delete({
      instance: { name: instance },
      name: flagName,
    });
  }

  async instanceGetFlags(instance: string) {
    await this.throwIfInstanceDoesNotExist(instance);

    return this.flagsRepository.find({ instance: { name: instance } });
  }

  async instanceDelete(instance: string) {
    await this.throwIfInstanceDoesNotExist(instance);

    await this.instancesRepository.delete({ name: instance });
  }

  async instanceRename(oldName: string, newName: string) {
    validateInstanceName(newName);

    await this.instancesRepository.update({ name: oldName }, { name: newName });
  }

  async userCheckExists(email: string, instance: string) {
    return Boolean(await this.userGetByEmail(email, instance));
  }

  async userGetUsers(instance: string) {
    await this.throwIfInstanceDoesNotExist(instance);

    return await this.usersRepository.find({ instance: { name: instance } });
  }

  async userGetByEmail(email: string, instance: string) {
    await this.throwIfInstanceDoesNotExist(instance);

    return this.usersRepository.findOne({
      instance: { name: instance },
      email,
    });
  }

  async userRegister(email: string, instance: string) {
    validateEmail(email);

    await this.throwIfInstanceDoesNotExist(instance);

    if (await this.userCheckExists(email, instance))
      throw new NotFoundException(
        `User ${email} already exists in instance ${instance}`,
      );

    await this.usersRepository.create({
      instance: { name: instance },
      email,
    });
  }

  async userDelete(email: string, instance: string) {
    await this.throwIfUserDoesNotExist(email, instance);

    this.usersRepository.delete({ instance: { name: instance }, email });
  }

  async userGetFlags(email: string, instance: string) {
    this.throwIfUserDoesNotExist(email, instance);

    const user = await this.userGetByEmail(email, instance);

    return user.flags;
  }

  async userSetFlags(email: string, instance: string, flags: string[]) {
    this.throwIfUserDoesNotExist(email, instance);

    await this.usersRepository.update(
      { instance: { name: instance }, email },
      {
        flags: flags.map((name) => ({ name })),
      },
    );
  }

  async userGetGroups(email: string, instance: string) {
    this.throwIfUserDoesNotExist(email, instance);

    const user = await this.userGetByEmail(email, instance);

    return user.groups;
  }

  async userSetGroups(email: string, instance: string, groups: string[]) {
    this.throwIfUserDoesNotExist(email, instance);

    await this.usersRepository.update(
      { instance: { name: instance }, email },
      {
        groups: groups.map((name) => ({ name })),
      },
    );
  }

  async groupCheckExists(groupId: number, instance: string) {
    return Boolean(await this.groupGetById(groupId, instance));
  }

  async groupGetById(groupId: number, instance: string) {
    await this.throwIfInstanceDoesNotExist(instance);

    return this.groupsRepository.findOne(groupId);
  }

  async groupGetGroups(instance: string) {
    await this.throwIfInstanceDoesNotExist(instance);

    return this.groupsRepository.find({ instance: { name: instance } });
  }

  async groupAdd({ name, description }: GroupBase, instance: string) {
    await this.throwIfInstanceDoesNotExist(instance);

    await this.groupsRepository.create({
      name,
      description,
      instance: { name: instance },
    });
  }

  async groupUpdate(
    groupId: number,
    { name, description }: GroupBase,
    instance: string,
  ) {
    const group = await this.groupGetById(groupId, instance);

    if (name) group.name = name;
    if (description) group.description = description;

    await this.groupsRepository.update(
      { id: groupId },
      {
        name: name || group.name,
        description: description || group.description,
      },
    );
  }

  async groupDelete(groupId: number, instance: string) {
    await this.throwIfGroupDoesNotExist(groupId, instance);

    await this.groupsRepository.delete(groupId);
  }

  async groupGetFlags(groupId: number, instance: string) {
    const group = await this.groupGetById(groupId, instance);

    return group.flags;
  }

  async groupSetFlags(groupId: number, instance: string, flags: string[]) {
    await this.throwIfGroupDoesNotExist(groupId, instance);

    await this.groupsRepository.update(
      { id: groupId },
      {
        flags: flags.map((name) => ({ name })),
      },
    );
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

  private async throwIfGroupDoesNotExist(groupId: number, instance: string) {
    if (!(await this.groupCheckExists(groupId, instance)))
      throw new NotFoundException(
        `Group ${groupId} doesn't exist in instance ${instance}`,
      );
  }
}
