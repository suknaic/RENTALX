import { sign, verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import auth from '@config/auth';
import { IUserTokenRepository } from '@modules/accounts/repositories/IUserTokenRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/model/IDateProvider';
import { AppError } from '@shared/error/AppError';

interface IPayload {
  sub: string;
  email: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject('IUserTokenRepository')
    private usersTokenRepository: IUserTokenRepository,
    @inject('IDateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute(refreshToken: string): Promise<string> {
    const { email, sub } = verify(
      refreshToken,
      auth.secret_refresh_token
    ) as IPayload;

    const userRefreshToken =
      await this.usersTokenRepository.findByUserIdAndRefreshToken(
        sub,
        refreshToken
      );

    if (!userRefreshToken) throw new AppError('Refresh Token does not exists');

    await this.usersTokenRepository.deleteById(userRefreshToken.id);

    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: sub,
      expiresIn: auth.expires_in_refresh_token,
    });

    const expires_date = this.dateProvider.addDays(
      auth.expires_refresh_token_day
    );

    await this.usersTokenRepository.create({
      user_id: sub,
      refresh_token,
      expires_date,
    });

    return refresh_token;
  }
}

export { RefreshTokenUseCase };
