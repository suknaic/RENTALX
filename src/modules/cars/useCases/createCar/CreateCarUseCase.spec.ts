import { FakeCarRepository } from '@modules/cars/repositories/Fake/FakeCarRepository';
import { AppError } from '@shared/error/AppError';

import { CreateCarUseCase } from './CreateCarUseCase';

describe('[CreateCarUseCase]', () => {
  let createCarUseCase: CreateCarUseCase;
  let fakeCarRepository: FakeCarRepository;

  beforeEach(() => {
    fakeCarRepository = new FakeCarRepository();
    createCarUseCase = new CreateCarUseCase(fakeCarRepository);
  });

  it('should be able to create a new Car', async () => {
    await createCarUseCase.execulte({
      name: 'car test',
      description: 'test to create a new car',
      dayly_rate: 10,
      license_plate: 'test-xxxx-xxxx',
      fine_amount: 650,
      brand: 'brand-test',
    });
  });

  it('should not be able to create a new car with license_plate existente', async () => {
    await createCarUseCase.execulte({
      name: 'car test',
      description: 'test to create a new car',
      dayly_rate: 10,
      license_plate: 'test-1234-1234',
      fine_amount: 650,
      brand: 'brand-test',
    });

    expect(async () => {
      await createCarUseCase.execulte({
        name: 'car test',
        description: 'test failt to creeate duplicate car',
        dayly_rate: 5,
        license_plate: 'test-1234-1234',
        fine_amount: 700,
        brand: 'brand-test',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be able create a new car available by default', async () => {
    await createCarUseCase.execulte({
      name: 'car test',
      description: 'test failt to creeate duplicate car',
      dayly_rate: 5,
      license_plate: 'test-1234-1234',
      fine_amount: 700,
      brand: 'brand-test',
    });

    const carTest = await fakeCarRepository.findByLincensePlate(
      'test-1234-1234'
    );

    expect(carTest.available).toBe(true);
  });
});
