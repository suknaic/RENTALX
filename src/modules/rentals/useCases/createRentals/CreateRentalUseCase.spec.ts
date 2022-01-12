import dayjs from 'dayjs';

import { FakeCarRepository } from '@modules/cars/repositories/Fake/FakeCarRepository';
import { FakeRentalRepository } from '@modules/rentals/repositories/fake/FakeRentalRepository';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/error/AppError';

import { CreateRentalUseCase } from './CreateRentalUseCase';

describe('[CreateRentalsUseCase]', () => {
  let fakeRentalRepository: FakeRentalRepository;
  let createRentalUseCase: CreateRentalUseCase;
  let fakeDateProvider: DayjsDateProvider;
  let fakeCarRepository: FakeCarRepository;
  const add24hours = dayjs().add(1, 'day').toDate();

  beforeEach(() => {
    fakeDateProvider = new DayjsDateProvider();
    fakeRentalRepository = new FakeRentalRepository();
    fakeCarRepository = new FakeCarRepository();
    createRentalUseCase = new CreateRentalUseCase(
      fakeRentalRepository,
      fakeDateProvider,
      fakeCarRepository
    );
  });

  it('should be able to create a rental', async () => {
    const car = await fakeCarRepository.create({
      name: 'car test',
      description: 'car test useCase',
      daily_rate: 100,
      fine_amount: 40,
      category_id: 'categoryTest',
      brand: 'abcd-1234',
      license_plate: 'license-test',
    });

    const rental = await createRentalUseCase.execute({
      car_id: car.id,
      user_id: '12345',
      expected_return_date: add24hours,
    });

    expect(rental).toHaveProperty('id');
  });

  it('should not be able to create a rental if theres is another open the same user ', async () => {
    const car1 = await fakeCarRepository.create({
      name: 'car test 1',
      description: 'car test useCase',
      daily_rate: 100,
      fine_amount: 40,
      category_id: 'categoryTest',
      brand: 'abcd-1234',
      license_plate: 'license-test',
    });

    const car2 = await fakeCarRepository.create({
      name: 'car test 2',
      description: 'car test useCase',
      daily_rate: 100,
      fine_amount: 40,
      category_id: 'categoryTest',
      brand: 'abcd-4321',
      license_plate: 'license',
    });

    await createRentalUseCase.execute({
      car_id: car1.id,
      user_id: '12345',
      expected_return_date: add24hours,
    });

    await expect(
      createRentalUseCase.execute({
        car_id: car2.id,
        user_id: '12345',
        expected_return_date: add24hours,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a rental if theres is another open the same car ', async () => {
    const car = await fakeCarRepository.create({
      name: 'car test',
      description: 'car test useCase',
      daily_rate: 100,
      fine_amount: 40,
      category_id: 'categoryTest',
      brand: 'abcd-1234',
      license_plate: 'license-test',
    });

    await createRentalUseCase.execute({
      car_id: car.id,
      user_id: '00001',
      expected_return_date: add24hours,
    });

    await expect(
      createRentalUseCase.execute({
        car_id: car.id,
        user_id: '00002',
        expected_return_date: add24hours,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental with invalid time', async () => {
    await expect(
      createRentalUseCase.execute({
        car_id: '00001',
        user_id: '00002',
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
