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
    await createCarUseCase.execute({
      name: 'nameCar',
      description: 'descriptionCar',
      daily_rate: 100,
      license_plate: 'abcd-1234',
      fine_amount: 500,
      brand: 'ford',
      category_id: 'category',
    });
  });

  it('should not be able to create a new car with license_plate existente', async () => {
    await createCarUseCase.execute({
      name: 'car test',
      description: 'test to create a new car',
      daily_rate: 10,
      license_plate: 'test-1234-1234',
      fine_amount: 650,
      brand: 'brand-test',
      category_id: 'category',
    });

    expect(async () => {
      await createCarUseCase.execute({
        name: 'car test',
        description: 'test fail to create duplicate car',
        daily_rate: 5,
        license_plate: 'test-1234-1234',
        fine_amount: 700,
        brand: 'brand-test',
        category_id: 'category',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be able create a new car available by default', async () => {
    await createCarUseCase.execute({
      name: 'car test',
      description: 'test fail to create duplicate car',
      daily_rate: 5,
      license_plate: 'test-1234-1234',
      fine_amount: 700,
      brand: 'brand-test',
      category_id: 'category',
    });

    const carTest = await fakeCarRepository.findByLicensePlate(
      'test-1234-1234'
    );

    expect(carTest.available).toBe(true);
  });
});
