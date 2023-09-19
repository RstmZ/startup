import { Exclude } from 'class-transformer';
import { BeforeInsert, Column, Entity, Index } from 'typeorm';

import { Base } from '../bases/entities/base.entity';
import { HashProvider } from './providers';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User extends Base {
  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  @Index({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @BeforeInsert()
  async generatePasswordHash() {
    const hashProvider = new HashProvider();

    this.password = await hashProvider.generateHash(this.password);
  }

  getPublicUser() {
    const { password, ...user } = this;
    return user as Omit<User, 'password'>;
  }
}
