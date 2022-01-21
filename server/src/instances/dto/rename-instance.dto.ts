import { ApiProperty } from '@nestjs/swagger';

export default class RenameInstanceDto {
  @ApiProperty({
    required: true,
    description: 'Instance old name',
  })
  oldName: string;

  @ApiProperty({
    required: true,
    description: 'Instance new name',
  })
  newName: string;
}
