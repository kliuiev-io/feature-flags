import { ApiProperty } from '@nestjs/swagger';

export default class SetFlagDto {
  @ApiProperty({
    required: true,
    description: 'Feature flag name',
  })
  flag: string;

  @ApiProperty({
    required: true,
    description: 'Feature flag value',
  })
  value: boolean;
}
