import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class LoginDTO {
  @ApiProperty({
    description: 'Your email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Your strong password',
  })
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(64)
  password: string;
}
