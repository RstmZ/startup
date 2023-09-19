import { Module } from '@nestjs/common';
import { WinstonLoggerService } from '../../winston.logger';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, WinstonLoggerService],
  exports: [UsersService],
})
export class UsersModule {}
