import { ApiProperty } from '@nestjs/swagger';

export default class FlagsDto {
  @ApiProperty({ required: true })
  flags: string[];
}
