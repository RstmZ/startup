import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { WinstonLoggerService } from '../../winston.logger';
import { User } from './users.entity';
import { CreateUserDTO } from './dto/createUserDTO';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    private readonly logger: WinstonLoggerService,
  ) {}

  public async findUserByID(id: string): Promise<Omit<User, 'password'>> {
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      this.logger.error(`User with ${id} not found`);
      throw new NotFoundException('User not found!');
    }

    return user.getPublicUser();
  }

  public async findUserByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      this.logger.error(`User with ${email} not found`);
      throw new NotFoundException('User not found!');
    }

    return user;
  }

  public async createUser({
    name,
    email,
    password,
  }: CreateUserDTO): Promise<Omit<User, 'password'>> {
    const user = await this.usersRepository
      .create({ name, email, password })
      .save();

    return user.getPublicUser();
  }

  public async checkExistance(email: string): Promise<boolean> {
    return !!(await this.usersRepository.findOne({
      where: {
        email,
      },
    }));
  }
}
