import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../error/AppError';
import { IUSerRepository } from '../../repositories/IUserRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
  driver_license: string;
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('IUSerRepository')
    private userRepository: IUSerRepository
  ) {}
  async execute({
    name,
    email,
    password,
    driver_license,
  }: IRequest): Promise<void> {
    const userAlredyExists = await this.userRepository.findByEmail(email);

    if (userAlredyExists) throw new AppError('User Alredy Exists');

    const passwordHashed = await hash(password, 8);
    await this.userRepository.create({
      name,
      email,
      password: passwordHashed,
      driver_license,
    });
  }
}

export { CreateUserUseCase };
