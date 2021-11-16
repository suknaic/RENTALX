import { ICreateUserDTO } from '../dtos/ICreateUserDTO';

interface IUSerRepository {
  create({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<void>;
}

export { IUSerRepository };
