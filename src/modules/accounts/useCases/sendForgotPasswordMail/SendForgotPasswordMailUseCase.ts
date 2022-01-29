import { inject, injectable } from 'tsyringe';
import { v4 as uuidv4 } from 'uuid';

import { IUSerRepository } from '@modules/accounts/repositories/IUserRepository';
import { IUserTokenRepository } from '@modules/accounts/repositories/IUserTokenRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/model/IDateProvider';
import { AppError } from '@shared/error/AppError';

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject('IUSerRepository')
    private usersRepository: IUSerRepository,
    @inject('IUserTokenRepository')
    private usersTokenRepository: IUserTokenRepository,
    @inject('IDateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new AppError('user not found');

    const token = uuidv4();

    const expires_date = this.dateProvider.addHours(3);

    await this.usersTokenRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date,
    });
  }
}

export { SendForgotPasswordMailUseCase };
