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
import GroupsDto from './dto/groups.dto';
import RegisterUserDto from './dto/register-user.dto';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':instance')
  async getUsers(@Param('instance') instance: string) {
    return this.usersService.getUsers(instance);
  }

  @Post(':instance')
  async registerUser(
    @Param('instance') instance: string,
    @Body() registerUserDto: RegisterUserDto,
  ) {
    return this.usersService.registerUser(registerUserDto.email, instance);
  }

  @Delete(':instance/:email')
  async deleteUser(
    @Param('instance') instance: string,
    @Param('email') email: string,
  ) {
    return this.usersService.deleteUser(email, instance);
  }

  @Get(':instance/:email/groups')
  async getGroups(
    @Param('instance') instance: string,
    @Param('email') email: string,
  ) {
    return this.usersService.getGroups(email, instance);
  }

  @Put(':instance/:email/groups')
  async setGroups(
    @Param('instance') instance: string,
    @Param('email') email: string,
    @Body() groupsDto: GroupsDto,
  ) {
    return this.usersService.setGroups(email, instance, groupsDto.groups);
  }
}
