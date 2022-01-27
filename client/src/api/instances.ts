import { Api } from "./api";

export interface FlagBase {
  description: string;
  defaultState: boolean;
}

export type Flag = FlagBase & {
  id: string;
};

export type Flags = { [key: string]: Flag };

export class InstancesApi {
  static getInstances = () => Api.get<string[]>(`instances/`);

  static createInstance = (instance: string) => Api.post(`instances/`, { instance });

  static renameInstance = (oldName: string, newName: string) => Api.put(`instances/`, { oldName, newName });

  static deleteInstance = (instance: string) => Api.delete(`instances/${instance}`);

  static getFlags = (instance: string) => Api.get<Flags>(`instances/${instance}/flags`);

  static createFlag = (name: string, instance: string, description: string, defaultState: boolean = false) => Api.post(`instances/${instance}/flags`, { name, description, defaultState });

  static updateFlag = (flagName: string, instance: string, description: string, defaultState: boolean) => Api.put(`instances/${instance}/flags/${flagName}`, { description, defaultState });

  static deleteFlag = (flagName: string, instance: string) => Api.delete(`instances/${instance}/flags/${flagName}`);
}