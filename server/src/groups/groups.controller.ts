import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import FlagsDto from './dto/flags.dto';
import GroupBaseDto from './dto/group-base.dto';
import { GroupsService } from './groups.service';

@Controller('groups')
@ApiTags('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Get(':instance')
  async getGroups(@Param('instance') instance: string) {
    return this.groupsService.getGroups(instance);
  }

  @Get(':instance/:id')
  async getGroup(
    @Param('instance') instance: string,
    @Param('id') groupId: number,
  ) {
    return this.groupsService.getGroup(groupId, instance);
  }

  @Post(':instance/')
  async addGroup(
    @Param('instance') instance: string,
    @Body() groupBaseDto: GroupBaseDto,
  ) {
    this.groupsService.addGroup(
      groupBaseDto.name,
      groupBaseDto.description,
      instance,
    );
  }

  @Put(':instance/:id')
  async updateGroup(
    @Param('instance') instance: string,
    @Param('id') groupId: number,
    @Body() groupBaseDto: GroupBaseDto,
  ) {
    this.groupsService.updateGroup(
      groupId,
      groupBaseDto.name,
      groupBaseDto.description,
      instance,
    );
  }

  @Delete(':instance/:id')
  async deleteGroup(
    @Param('instance') instance: string,
    @Param('id') groupId: number,
  ) {
    this.groupsService.deleteGroup(groupId, instance);
  }

  @Get(':instance/:id/flags')
  async getFlags(
    @Param('instance') instance: string,
    @Param('id') groupId: number,
  ) {
    return this.groupsService.getFlags(groupId, instance);
  }

  @Put(':instance/:id/flags')
  async setFlags(
    @Param('instance') instance: string,
    @Param('id') groupId: number,
    @Body() flagsDto: FlagsDto,
  ) {
    this.groupsService.setFlags(groupId, instance, flagsDto.flags);
  }
}
