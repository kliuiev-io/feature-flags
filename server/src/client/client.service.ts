import { Injectable } from '@nestjs/common';

@Injectable()
export class ClientService {
  async getFlags(email: string, instance: string) {
    // TODO:
    return [null];
  }
}
