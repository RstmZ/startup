import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CreateUserDTO } from '../dto/createUserDTO';
import { User } from '../users.entity';

export function CreateUser() {
  return applyDecorators(
    ApiBody({
      type: CreateUserDTO,
      description: 'Body sign In.',
    }),
    ApiOperation({
      summary: 'Create user',
    }),
    ApiCreatedResponse({
      description: 'The new User has been successfully created.',
      type: User,
    }),
    ApiConflictResponse({ description: 'The User already exists.' }),
    ApiBadRequestResponse({ description: 'Email or password is not valid.' }),
  );
}
