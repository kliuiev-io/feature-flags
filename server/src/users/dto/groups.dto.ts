import { ApiProperty } from '@nestjs/swagger';

export default class GroupsDto {
  @ApiProperty({ required: true })
  groups: number[];
}
