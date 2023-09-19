import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { ApiNotFoundResponse } from '@nestjs/swagger';
import { FastifyReply } from 'fastify';

@Controller()
export class NotFoundController {
  constructor() {}

  @Get('*')
  @ApiNotFoundResponse({ description: 'Page not found!' })
  getNotFound(@Res() res: FastifyReply): void {
    res.status(HttpStatus.NOT_FOUND).send({ message: 'Page Not Found!' });
  }
}
