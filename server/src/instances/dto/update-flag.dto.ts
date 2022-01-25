import { ApiProperty } from '@nestjs/swagger';
import { FlagBase } from 'src/database/database.interface';

export default class UpdateFlagDto implements FlagBase {
  @ApiProperty({ required: true })
  description: string;

  @ApiProperty({ required: true })
  defaultState: boolean;
}
