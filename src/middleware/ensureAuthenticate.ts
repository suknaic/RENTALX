import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { UserRepository } from '../modules/accounts/repositories/implementations/UserRepository';

interface IPayload {
  sub: string;
}

async function ensureAuthenticate(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) throw new Error('Token missing');

  const [, token] = authHeader.split(' ');

  try {
    const { sub } = verify(
      token,
      '2e0d7af2f8999be5d6af7f5c99ef27d4'
    ) as IPayload;

    const userRepository = new UserRepository();

    const user = await userRepository.findById(sub);

    if (!user) throw new Error('User does not exists');

    next();
  } catch {
    throw new Error('token invalid!');
  }
}

export { ensureAuthenticate };
