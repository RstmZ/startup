import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/createUserDTO';
import { JwtAuthGuard } from '../auth/guards/jwtAuthGuard';
import * as UserDecorators from './decorators';
import { WinstonLoggerService } from '../../winston.logger';

@ApiTags('Users')
@Controller('user')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly logger: WinstonLoggerService,
  ) {}

  @Get()
  @UserDecorators.GetUser()
  @UseGuards(JwtAuthGuard)
  async getProfile(@Req() req: any, @Res() res: FastifyReply) {
    return res
      .status(HttpStatus.OK)
      .send(await this.usersService.findUserByID(req.user.id));
  }

  @Post()
  @UserDecorators.CreateUser()
  async createUser(
    @Res() res: FastifyReply,
    @Body()
    input: CreateUserDTO,
  ): Promise<void> {
    if (await this.usersService.checkExistance(input.email)) {
      this.logger.error(`User with ${input.email} already exists.`);
      throw new ConflictException('User exists');
    }

    return res
      .status(HttpStatus.CREATED)
      .send(await this.usersService.createUser(input));
  }
}
