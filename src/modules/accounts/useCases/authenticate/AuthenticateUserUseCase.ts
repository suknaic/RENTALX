import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { IUSerRepository } from '@modules/accounts/repositories/IUserRepository';
import { AppError } from '@shared/error/AppError';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('IUSerRepository')
    private useRepository: IUSerRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.useRepository.findByEmail(email);

    if (!user) throw new AppError('User not found');

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) throw new AppError('Password Invalid!');

    const token = sign({}, '2e0d7af2f8999be5d6af7f5c99ef27d4', {
      subject: `${user.id}`,
      expiresIn: '1d',
    });

    const tokenReturn: IResponse = {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    };

    return tokenReturn;
  }
}

export { AuthenticateUserUseCase };
