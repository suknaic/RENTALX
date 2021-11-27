import { NextFunction, Request, Response } from 'express';

import { UserRepository } from '@modules/accounts/infra/typeorm/repositories/UserRepository';
import { AppError } from '@shared/error/AppError';

async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const { id } = request.user;

  const userRepository = new UserRepository();

  const user = await userRepository.findById(id);

  if (!user.isAdmin) throw new AppError("user isn't admin");

  return next();
}

export { ensureAdmin };
