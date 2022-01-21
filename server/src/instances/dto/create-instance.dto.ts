import { ApiProperty } from '@nestjs/swagger';

export default class CreateInstanceDto {
  @ApiProperty({
    required: true,
    description: 'Instance name',
  })
  instance: string;
}
