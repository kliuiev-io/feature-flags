import { Api } from './api';

export class ClientApi {
  static getFlags = (instance: string, email: string) => Api.get<string[]>(`client/${instance}/${email}`);
}
