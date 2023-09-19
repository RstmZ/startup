import { FastifyRequest } from 'fastify';
import { User } from '../../users/users.entity';

export type AuthenticatedRequest = FastifyRequest & { user: User };
