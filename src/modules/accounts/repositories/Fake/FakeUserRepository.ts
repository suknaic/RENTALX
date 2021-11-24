import { User } from '@modules/accounts/infra/typeorm/entities/User';

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUSerRepository } from '../IUserRepository';

class FakeUserRepository implements IUSerRepository {
  private repository: User[];

  constructor() {
    this.repository = [];
  }

  async findById(id: string): Promise<User> {
    const user = this.repository.find((user) => user.id === id);

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.repository.find((user) => user.email === email);

    return user;
  }

  async create({
    id,
    name,
    email,
    password,
    driver_license,
    avatar,
  }: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, {
      id,
      name,
      email,
      password,
      driver_license,
      avatar,
    });

    this.repository.push(user);
  }
}

export { FakeUserRepository };
