import { Api } from "./api";
import { Group } from "./groups";
import { Flag } from "./instances";

export interface User {
  id: number;
  email: string;
  groups: string[];
  flags: string[];
}

export class UsersApi {
  static getUsers = (instance: string) => Api.get<User[]>(`users/${instance}`);

  static registerUser = (email: string, instance: string) => Api.post(`users/${instance}`, { email });

  static deleteUser = (email: string, instance: string) => Api.delete(`users/${instance}/${email}`);

  static getGroups = (email: string, instance: string) => Api.get<Group[]>(`users/${instance}/${email}/groups`);

  static setGroupsIds = (email: string, instance: string, groupsIds: number[]) => Api.put(`users/${instance}/${email}/groups`, { groups: groupsIds });

  static getFlagsNames = (email: string, instance: string) => Api.get<string[]>(`users/${instance}/${email}/flags`);

  static setFlagsNames = (email: string, instance: string, flagsNames: string[]) => Api.put(`users/${instance}/${email}/flags`, { flags: flagsNames });
}