import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import CreateFlagDto from './dto/create-flag.dto';
import CreateInstanceDto from './dto/create-instance.dto';
import RenameInstanceDto from './dto/rename-instance.dto';
import UpdateFlagDto from './dto/update-flag.dto';
import { InstancesService } from './instances.service';

@Controller('instances')
@ApiTags('instances')
export class InstancesController {
  constructor(private readonly instancesService: InstancesService) {}

  @Get()
  @ApiOperation({ description: 'Get all names of the instances' })
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  async getInstances() {
    return this.instancesService.getInstances();
  }

  @Post()
  @ApiOperation({ description: 'Create new instance' })
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @HttpCode(HttpStatus.CREATED)
  async createInstance(@Body() createInstanceDto: CreateInstanceDto) {
    return this.instancesService.addInstance(createInstanceDto.instance);
  }

  @Put()
  @ApiOperation({ description: 'Rename the instance' })
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @HttpCode(HttpStatus.OK)
  async renameInstance(@Body() renameInstanceDto: RenameInstanceDto) {
    return this.instancesService.renameInstance(
      renameInstanceDto.oldName,
      renameInstanceDto.newName,
    );
  }

  @Delete('/:instance')
  @ApiOperation({
    description: 'Delete the instance with all related flags, users and groups',
  })
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @HttpCode(HttpStatus.CREATED)
  async deleteInstance(@Param('instance') instance: string) {
    return this.instancesService.deleteInstance(instance);
  }

  @Get('/:instance/flags')
  @ApiOperation({
    description: 'Get instance flags',
  })
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @HttpCode(HttpStatus.CREATED)
  async getFlags(@Param('instance') instance: string) {
    return this.instancesService.getFlags(instance);
  }

  @Post('/:instance/flags')
  @ApiOperation({
    description: 'Create instance flag',
  })
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @HttpCode(HttpStatus.CREATED)
  async createFlag(
    @Param('instance') instance: string,
    @Body() flagData: CreateFlagDto,
  ) {
    return this.instancesService.addFlag(flagData.name, instance, flagData);
  }

  @Put('/:instance/flags/:flagName')
  @ApiOperation({
    description: 'Update instance flag',
  })
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @HttpCode(HttpStatus.CREATED)
  async updateFlag(
    @Param('instance') instance: string,
    @Param('flagName') flagName: string,
    @Body() flagData: UpdateFlagDto,
  ) {
    return this.instancesService.updateFlag(flagName, instance, flagData);
  }

  @Delete('/:instance/flags/:flagName')
  @ApiOperation({
    description: 'Delete instance flag',
  })
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @HttpCode(HttpStatus.CREATED)
  async deleteFlag(
    @Param('instance') instance: string,
    @Param('flagName') flagName: string,
  ) {
    return this.instancesService.deleteFlag(flagName, instance);
  }
}
