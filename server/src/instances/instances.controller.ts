import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import CreateInstanceDto from './dto/create-instance.dto';
import RenameInstanceDto from './dto/rename-instance.dto';
import { InstancesService } from './instances.service';

@Controller('instances')
export class InstancesController {
  constructor(private readonly instancesService: InstancesService) {}

  @Get()
  async getInstances() {
    return this.instancesService.getInstances();
  }

  @Post()
  async createInstance(@Body() createInstanceDto: CreateInstanceDto) {
    return this.instancesService.addInstance(createInstanceDto.instance);
  }

  @Put()
  async renameInstance(@Body() renameInstanceDto: RenameInstanceDto) {
    return this.instancesService.renameInstance(
      renameInstanceDto.oldName,
      renameInstanceDto.newName,
    );
  }

  @Delete('/:instance')
  async deleteInstance(@Param('instance') instance: string) {
    this.instancesService.deleteInstance(instance);
  }
}
