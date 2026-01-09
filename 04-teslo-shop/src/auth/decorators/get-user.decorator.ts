import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { Request } from 'express';
import { User } from '../entities/user.entity';

export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<Request>();

    const user = req.user as User;

    if (!user) {
      throw new InternalServerErrorException('User not found');
    }

    if (data) {
      return user?.[data] as User;
    }

    return user;
  },
);
