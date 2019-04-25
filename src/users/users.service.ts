import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUser, CreatedUser } from './users.interfaces';
import { isUniqDbError } from '../core/db/errors.hanlder';
import { validateEntityInstance } from '../core/db/entities.validator';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  public async findByEmail(email: string): Promise<Users> {
    return await this.usersRepository.findOne({ email });
  }

  public async create(user: CreateUser): Promise<CreatedUser> {
    const newUser: Users = this.createUserEntityInstance(user);
    validateEntityInstance(newUser);
    return await this.saveUserEntity(newUser);
  }

  protected createUserEntityInstance = ({
    email,
    password,
    role,
    salt,
    status,
  }) => {
    const user = new Users();
    user.email = email;
    user.password = password;
    user.role = role;
    user.salt = salt;
    user.status = status;
    return user;
  };

  protected saveUserEntity = async (newUser: Users) => {
    try {
      const savedUser = await this.usersRepository.save(newUser);
      return {
        email: savedUser.email,
        role: savedUser.role,
        status: savedUser.status,
      };
    } catch (e) {
      if (isUniqDbError(e)) {
        throw new HttpException(
          { message: 'User with that email already exists' },
          HttpStatus.BAD_REQUEST,
        );
      }
      throw e;
    }
  };
}
