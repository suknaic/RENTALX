import dayjs from 'dayjs';

import { FakeRentalRepository } from '@modules/rentals/repositories/fake/FakeRentalRepository';

import { ListRentalsByUserUseCase } from './ListRentalsByUserUSeCase';

describe('[ListRentalsByUserUseCase]', () => {
  let listRentalsByUserUseCase: ListRentalsByUserUseCase;
  let fakeRentalRepository: FakeRentalRepository;
  const add24hours = dayjs().add(1, 'day').toDate();

  beforeAll(() => {
    fakeRentalRepository = new FakeRentalRepository();
    listRentalsByUserUseCase = new ListRentalsByUserUseCase(
      fakeRentalRepository
    );
  });

  it('should be able to list rentals by user', async () => {
    fakeRentalRepository.create({
      car_id: 'car-id',
      expected_return_date: add24hours,
      user_id: '54321',
      end_date: add24hours,
      id: '1234567',
      total: 100,
    });

    const rentals = await listRentalsByUserUseCase.execute('54321');

    expect(rentals).toHaveLength(1);
  });
});
