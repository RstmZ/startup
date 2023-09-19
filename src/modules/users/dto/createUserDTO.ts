import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({
    description: 'Your name/nickname',
  })
  @IsNotEmpty()
  name: string;

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
  @MaxLength(24)
  password: string;
}
