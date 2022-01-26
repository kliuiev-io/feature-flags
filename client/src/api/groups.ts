import { Api } from "./api";

export interface GroupBase {
  name: string;
  description: string;
}

export type Group = GroupBase & {
  id: string;
  flags: string[];
};

export class GroupsApi {
  static getGroups = (instance: string) => Api.get<Group[]>(`groups/${instance}`);

  static getGroup = (groupId: string, instance: string) => Api.get<Group>(`groups/${instance}/${groupId}`);

  static createGroup = (instance: string, name: string, description: string) => Api.post(`groups/${instance}`, { name, description });

  static updateGroup = (groupId: string, instance: string, name: string, description: string) => Api.put(`groups/${instance}/${groupId}`, { name, description });

  static deleteGroup = (groupId: string, instance: string) => Api.delete(`groups/${instance}/${groupId}`);

  static getFlags = (groupId: string, instance: string) => Api.get<string[]>(`groups/${instance}/${groupId}/flags`);

  static setFlags = (groupId: string, instance: string, flags: string[]) => Api.put(`groups/${instance}/${groupId}/flags`, { flags });
}