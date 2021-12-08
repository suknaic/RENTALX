import dayjs from 'dayjs';

import { FakeRentalRepository } from '@modules/rentals/repositories/fake/FakeRentalRepository';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/error/AppError';

import { CreateRentalUseCase } from './CreateRentalUseCase';

describe('[CreateRentalsUseCase]', () => {
  let fakeRentalRepository: FakeRentalRepository;
  let createRentalUseCase: CreateRentalUseCase;
  let fakeDateProvider: DayjsDateProvider;
  const add24hours = dayjs().add(1, 'day').toDate();

  beforeEach(() => {
    fakeDateProvider = new DayjsDateProvider();
    fakeRentalRepository = new FakeRentalRepository();
    createRentalUseCase = new CreateRentalUseCase(
      fakeRentalRepository,
      fakeDateProvider
    );
  });

  it('should be able to create a rental', async () => {
    const rental = await createRentalUseCase.execute({
      car_id: '67890',
      user_id: '12345',
      expected_return_date: add24hours,
    });

    expect(rental).toHaveProperty('id');
  });

  it('should not be able to create a rental if theres is another open the same user ', async () => {
    await createRentalUseCase.execute({
      car_id: '00001',
      user_id: '12345',
      expected_return_date: add24hours,
    });

    expect(async () => {
      await createRentalUseCase.execute({
        car_id: '00002',
        user_id: '12345',
        expected_return_date: add24hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a rental if theres is another open the same car ', async () => {
    await createRentalUseCase.execute({
      car_id: '00001',
      user_id: '00001',
      expected_return_date: add24hours,
    });

    expect(async () => {
      await createRentalUseCase.execute({
        car_id: '00001',
        user_id: '00002',
        expected_return_date: add24hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental with invalid time', () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: '00001',
        user_id: '00002',
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
