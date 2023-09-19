import {
  Controller,
  Post,
  HttpStatus,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/localAuth.guard.ts';
import { AuthenticatedRequest } from './types/types';
import { ApiTags } from '@nestjs/swagger';
import * as AuthDecorators from './decorators';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post()
  @AuthDecorators.LoginUser()
  async login(
    @Req() req: AuthenticatedRequest,
    @Res() res: FastifyReply,
  ): Promise<void> {
    return res
      .status(HttpStatus.OK)
      .send(await this.authService.login(req.user));
  }
}
