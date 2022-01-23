import { getRepository, Repository } from 'typeorm';

import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO';
import { IUserTokenRepository } from '@modules/accounts/repositories/IUserTokenRepository';

import { UserToken } from '../entities/UserToken';

class UserTokenRepository implements IUserTokenRepository {
  private repository: Repository<UserToken>;

  constructor() {
    this.repository = getRepository(UserToken);
  }

  async create({
    user_id,
    refresh_token,
    expires_date,
  }: ICreateUserTokenDTO): Promise<void> {
    const userToken = this.repository.create({
      user_id,
      refresh_token,
      expires_date,
    });

    await this.repository.save(userToken);
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserToken> {
    const userToken = await this.repository.findOne({
      where: { user_id, refresh_token },
    });
    return userToken;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { UserTokenRepository };
