import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { FeatureFlagsService } from './featureflags.service';
import SetFlagDto from './dto/set-flag.dto';

@Controller('flags')
export class FeatureFlagsController {
  constructor(private readonly featureFlagsService: FeatureFlagsService) {}

  @Get('/:instance')
  public async checkFlag(@Param('instance') instance: string) {
    this.featureFlagsService.getFlags(instance);
  }

  @Put('/:instance')
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
  async deleteFlag(
    @Param('instance') instance: string,
    @Param('flagName') flagName: string,
  ) {
    this.featureFlagsService.deleteFlag(flagName, instance);
  }
}
