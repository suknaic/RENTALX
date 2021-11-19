import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../error/AppError';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUSerRepository } from '../../repositories/IUserRepository';

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
  }: ICreateUserDTO): Promise<void> {
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
