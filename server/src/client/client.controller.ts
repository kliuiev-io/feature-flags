import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClientService } from './client.service';

@Controller('client')
@ApiTags('public')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get(':instance')
  async getFlags(@Param('instance') instance: string) {
    return this.clientService.getFlags(null, instance);
  }

  @Get(':instance/:email')
  async getFlagsUser(
    @Param('instance') instance: string,
    @Param('email') email: string,
  ) {
    return this.clientService.getFlags(email, instance);
  }
}
