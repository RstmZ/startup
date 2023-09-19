import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { HashProvider } from '../users/providers';
import { JwtService } from '@nestjs/jwt';
import { WinstonLoggerService } from '../../winston.logger';

import { User } from '../users/users.entity';
import { LoginDTO, LoginReturnDTO } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly logger: WinstonLoggerService,
  ) {}

  async validateUser({ email, password }: LoginDTO): Promise<User | null> {
    const user = await this.usersService.findUserByEmail(email);
    const passwordValid = await new HashProvider().compareHash(
      password,
      user.password,
    );

    if (!passwordValid) {
      this.logger.error(`The user ${email} entered the wrong password`);
      return null;
    }

    return user;
  }

  async login(user: { id: string }): Promise<LoginReturnDTO> {
    return {
      access_token: this.jwtService.sign({ sub: user.id }),
    };
  }
}
