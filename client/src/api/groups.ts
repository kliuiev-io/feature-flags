import { Api } from "./api";
import { Flag } from "./instances";

export interface GroupBase {
  name: string;
  description: string;
}

export type Group = GroupBase & {
  id: number;
  flags: string[];
};

export class GroupsApi {
  static getGroups = (instance: string) => Api.get<Group[]>(`groups/${instance}`);

  static getGroup = (groupId: number, instance: string) => Api.get<Group>(`groups/${instance}/${groupId}`);

  static createGroup = (instance: string, name: string, description: string) => Api.post(`groups/${instance}`, { name, description });

  static updateGroup = (groupId: number, instance: string, name: string, description: string) => Api.put(`groups/${instance}/${groupId}`, { name, description });

  static deleteGroup = (groupId: number, instance: string) => Api.delete(`groups/${instance}/${groupId}`);

  static getFlagsNames = (groupId: number, instance: string) => Api.get<string[]>(`groups/${instance}/${groupId}/flags`);

  static setFlagsNames = (groupId: number, instance: string, flags: string[]) => Api.put(`groups/${instance}/${groupId}/flags`, { flags });
}