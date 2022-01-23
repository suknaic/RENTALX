import { ICreateUserTokenDTO } from '../dtos/ICreateUserTokenDTO';
import { UserToken } from '../infra/typeorm/entities/UserToken';

interface IUserTokenRepository {
  create({
    user_id,
    refresh_token,
    expires_date,
  }: ICreateUserTokenDTO): Promise<void>;

  findByUserIdAndRefreshToken(
    id: string,
    refresh_token: string
  ): Promise<UserToken>;

  deleteById(id: string): Promise<void>;
}

export { IUserTokenRepository };
