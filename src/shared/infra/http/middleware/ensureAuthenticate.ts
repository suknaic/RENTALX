import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import auth from '@config/auth';
import { UserRepository } from '@modules/accounts/infra/typeorm/repositories/UserRepository';
import { UserTokenRepository } from '@modules/accounts/infra/typeorm/repositories/UserTokenRepository';
import { AppError } from '@shared/error/AppError';

interface IPayload {
  sub: string;
}

async function ensureAuthenticate(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) throw new AppError('Token missing', 401);

  const [, token] = authHeader.split(' ');

  try {
    const { sub } = verify(token, auth.secret_refresh_token) as IPayload;

    const userTokenRepository = new UserTokenRepository();

    const user = await userTokenRepository.findByUserIdAndRefreshToken(
      sub,
      token
    );

    if (!user) throw new AppError('User does not exists', 401);

    request.user = {
      id: user.id,
    };
    next();
  } catch {
    throw new AppError('token invalid!');
  }
}

export { ensureAuthenticate };
