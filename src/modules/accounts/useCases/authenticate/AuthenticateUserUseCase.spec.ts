import { AppError } from '@error/AppError';
import { FakeUserRepository } from '@modules/accounts/repositories/Fake/FakeUserRepository';

import { CreateUserUseCase } from '../createuser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let fakeUserRepository: FakeUserRepository;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe('[AuthenticateUserUseCase]', () => {
  beforeEach(async () => {
    fakeUserRepository = new FakeUserRepository();
    authenticateUserUseCase = new AuthenticateUserUseCase(fakeUserRepository);
    createUserUseCase = new CreateUserUseCase(fakeUserRepository);

    await createUserUseCase.execute({
      name: 'user test',
      email: 'test@rentalx.com',
      password: '12345',
      driver_license: '1234-xxx-xxx-xx',
    });
  });

  it('should be able to authenticate a user', async () => {
    const result = await authenticateUserUseCase.execute({
      email: 'test@rentalx.com',
      password: '12345',
    });

    expect(result).toHaveProperty('token');
  });

  it('should not be able to authenticate a user nonexistent', () => {
    expect(async () =>
      authenticateUserUseCase.execute({
        email: 'unknow@rentalx.com',
        password: 'unknowPassword',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate a user with password incorrect', () => {
    expect(async () =>
      authenticateUserUseCase.execute({
        email: 'test@rentalx.com',
        password: 'invalid-password',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
