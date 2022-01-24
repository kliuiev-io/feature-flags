import { ApiProperty } from '@nestjs/swagger';
import { GroupBase } from 'src/database/database.interface';

export default class GroupBaseDto implements GroupBase {
  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: true })
  description: string;
}
