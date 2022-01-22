import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import auth from '@config/auth';
import { IUSerRepository } from '@modules/accounts/repositories/IUserRepository';
import { IUserTokenRepository } from '@modules/accounts/repositories/IUserTokenRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/model/IDateProvider';
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
  refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('IUSerRepository')
    private useRepository: IUSerRepository,
    @inject('IUserTokenRepository')
    private userSTokenRepository: IUserTokenRepository,
    @inject('IDateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.useRepository.findByEmail(email);

    if (!user) throw new AppError('User not found');

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) throw new AppError('Password Invalid!');

    const token = sign({}, auth.secret_token, {
      subject: `${user.id}`,
      expiresIn: auth.expires_in_token,
    });

    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: user.id,
      expiresIn: auth.expires_in_refresh_token,
    });

    const expires_refresh_token = this.dateProvider.addDays(
      auth.expires_refresh_token
    );

    await this.userSTokenRepository.create({
      user_id: user.id,
      refresh_token,
      expires_date: expires_refresh_token,
    });

    const tokenReturn: IResponse = {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
      refresh_token,
    };

    return tokenReturn;
  }
}

export { AuthenticateUserUseCase };
