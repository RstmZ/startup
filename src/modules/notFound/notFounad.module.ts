import { Module } from '@nestjs/common';
import { NotFoundController } from './notFound.controller';

@Module({
  controllers: [NotFoundController],
})
export class NotFoundModule {}
