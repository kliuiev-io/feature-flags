import { Api } from "./api";

export interface User {
  email: string;
  groups: string[];
  flags: string[];
}

export class UsersApi {
  static getUsers = (instance: string) => Api.get<User[]>(`users/${instance}`);

  static registerUser = (email: string, instance: string) => Api.post(`users/${instance}`, { email });

  static deleteUser = (email: string, instance: string) => Api.delete(`users/${instance}/${email}`);

  static getGroupsIds = (email: string, instance: string) => Api.get<string[]>(`users/${instance}/${email}/groups`);

  static setGroupsIds = (email: string, instance: string, groups: string[]) => Api.put(`users/${instance}/${email}/groups`, { groups });

  static getFlagsIds = (email: string, instance: string) => Api.get<string[]>(`users/${instance}/${email}/flags`);

  static setFlagsIds = (email: string, instance: string, flags: string[]) => Api.put(`users/${instance}/${email}/flags`, { flags });
}