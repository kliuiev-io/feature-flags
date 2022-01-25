import { ApiProperty } from '@nestjs/swagger';
import { FlagBase } from 'src/database/database.interface';

export default class CreateFlagDto implements FlagBase {
  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: true })
  description: string;

  @ApiProperty({ required: true })
  defaultState: boolean;
}
