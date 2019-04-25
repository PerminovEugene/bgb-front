import { validate } from 'class-validator';
import { BasicEntity } from '../interfaces/entity';
import { HttpException, HttpStatus } from '@nestjs/common';

export const validateEntityInstance = async (entityInstance: BasicEntity) => {
  const errors = await validate(entityInstance);
  if (errors.length > 0) {
    const _errors = { email: 'Userinput is not valid.' };
    throw new HttpException(
      { message: 'Input data validation failed', _errors },
      HttpStatus.BAD_REQUEST,
    );
  }
};
