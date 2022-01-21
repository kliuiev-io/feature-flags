import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Put,
} from '@nestjs/common';
import { FeatureFlagsService } from './featureflags.service';
import SetFlagDto from './dto/set-flag.dto';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

@Controller('flags')
export class FeatureFlagsController {
  constructor(private readonly featureFlagsService: FeatureFlagsService) {}

  @Get('/:instance')
  @ApiOperation({ description: 'Get all flags of the instance' })
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @HttpCode(HttpStatus.OK)
  public async getFlags(@Param('instance') instance: string) {
    this.featureFlagsService.getFlags(instance);
  }

  @Put('/:instance')
  @ApiOperation({ description: 'Set (add or update) the flag of the instance' })
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @HttpCode(HttpStatus.OK)
  async setFlag(
    @Param('instance') instance: string,
    @Body() setFlagDto: SetFlagDto,
  ) {
    return this.featureFlagsService.setFlag(
      setFlagDto.flag,
      setFlagDto.value,
      instance,
    );
  }

  @Delete('/:instance/:flagName')
  @ApiOperation({ description: 'Delete the flag of the instance' })
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @HttpCode(HttpStatus.OK)
  async deleteFlag(
    @Param('instance') instance: string,
    @Param('flagName') flagName: string,
  ) {
    this.featureFlagsService.deleteFlag(flagName, instance);
  }
}
