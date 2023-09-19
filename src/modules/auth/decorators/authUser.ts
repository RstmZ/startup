import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { LoginDTO, LoginReturnDTO } from '../dto';

export function LoginUser() {
  return applyDecorators(
    ApiBody({
      type: LoginDTO,
      description: 'Body sign In.',
    }),
    ApiUnauthorizedResponse({
      description: 'Login or password are incorrect',
    }),
    ApiNotFoundResponse({ description: 'The User does not exist.' }),
    ApiBadRequestResponse({
      description: 'Email or password is not valid.',
    }),
    ApiOkResponse({
      description: 'Logged in successfully.',
      type: LoginReturnDTO,
    }),
  );
}
