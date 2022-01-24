import { ApiProperty } from '@nestjs/swagger';

export default class RegisterUserDto {
  @ApiProperty({ required: true })
  email: string;
}
