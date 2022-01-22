import { ICreateUserTokenDTO } from '../dtos/ICreateUserTokenDTO';

interface IUserTokenRepository {
  create({
    user_id,
    refresh_token,
    expires_date,
  }: ICreateUserTokenDTO): Promise<void>;
}

export { IUserTokenRepository };
