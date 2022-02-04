import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ClientService } from './client.service';

@Controller('client')
@ApiTags('public')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get(':instance/:email?')
  @ApiOperation({ description: 'Get flags of the user' })
  @ApiOkResponse()
  @ApiBadRequestResponse()
  async getFlagsUser(
    @Param('instance') instance: string,
    @Param('email') email: string | null,
  ) {
    return this.clientService.getFlags(email || null, instance);
  }
}
