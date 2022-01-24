import { Controller, Get, Param } from '@nestjs/common';
import { ClientService } from './client.service';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get(':instance/:email')
  async getFlags(@Param('instance') instance: string, @Param('email') email: string) {
    this.clientService.getFlags(email, instance);
  }
}
