import { ICreateUserDTO } from '../dtos/ICreateUserDTO';

interface IUSerRepository {
  create({
    name,
    username,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<void>;
}

export { IUSerRepository };
