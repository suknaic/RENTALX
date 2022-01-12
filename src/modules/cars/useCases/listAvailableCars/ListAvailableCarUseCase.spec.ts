import { FakeCarRepository } from '@modules/cars/repositories/Fake/FakeCarRepository';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

describe('[ListAvailableCarUseCase]', () => {
  let fakeCarsRepository: FakeCarRepository;
  let listAvailableCarUseCase: ListAvailableCarsUseCase;

  beforeEach(async () => {
    fakeCarsRepository = new FakeCarRepository();
    listAvailableCarUseCase = new ListAvailableCarsUseCase(fakeCarsRepository);

    await fakeCarsRepository.create({
      name: 'palio',
      description: 'carro ruim',
      daily_rate: 50,
      license_plate: 'ABCD-4321',
      fine_amount: 4000,
      brand: 'fiat',
      category_id: 'b205d457-452a-4e65-a7d1-b331b627307e',
    });
    await fakeCarsRepository.create({
      name: 'fiesta',
      description: 'consome muita gasolina',
      daily_rate: 80,
      license_plate: 'ABCD-5898',
      fine_amount: 13000,
      brand: 'ford',
      category_id: 'b205d457-452a-4e65-a7d1-b331b627307e',
    });
  });

  it('should be able to list all car availability', async () => {
    const allCarsAvailability = await listAvailableCarUseCase.execute({});

    expect(allCarsAvailability).toHaveLength(2);
    allCarsAvailability.forEach((car) =>
      expect(car).toEqual(expect.objectContaining({ available: true }))
    );
  });

  it('should be able to list all car availabiliti for name', async () => {
    const allCarsAvailability = await listAvailableCarUseCase.execute({
      name: 'palio',
    });

    expect(allCarsAvailability).toHaveLength(1);
    expect(allCarsAvailability).toEqual([
      expect.objectContaining({ name: 'palio' }),
    ]);
  });

  it('should be able to list all car availability for brand', async () => {
    const carAvailable = await listAvailableCarUseCase.execute({
      brand: 'ford',
    });

    expect(carAvailable).toHaveLength(1);
    expect(carAvailable).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ brand: 'ford', available: true }),
      ])
    );
  });

  it('should be able to list all car availability for category_id', async () => {
    const allCarsAvailability = await listAvailableCarUseCase.execute({
      category_id: 'b205d457-452a-4e65-a7d1-b331b627307e',
    });

    expect(allCarsAvailability).toHaveLength(2);
    allCarsAvailability.forEach((car) =>
      expect(car).toEqual(
        expect.objectContaining({
          category_id: 'b205d457-452a-4e65-a7d1-b331b627307e',
          available: true,
        })
      )
    );
  });
});
