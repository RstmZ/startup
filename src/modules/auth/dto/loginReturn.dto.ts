import { ApiProperty } from '@nestjs/swagger';

export class LoginReturnDTO {
  @ApiProperty()
  access_token: string;
}
