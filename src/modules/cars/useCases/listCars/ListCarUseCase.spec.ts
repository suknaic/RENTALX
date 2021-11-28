import { FakeCarRepository } from '@modules/cars/repositories/Fake/FakeCarRepository';

import { ListCarUseCase } from './ListCarsUseCase';

describe('[ListCarUseCase]', () => {
  let fakeCarsRepository: FakeCarRepository;
  let listCarUseCase: ListCarUseCase;

  beforeEach(async () => {
    fakeCarsRepository = new FakeCarRepository();
    listCarUseCase = new ListCarUseCase(fakeCarsRepository);

    await fakeCarsRepository.create({
      name: 'palio',
      description: 'carro ruim',
      dayly_rate: 50,
      license_plate: 'ABCD-4321',
      fine_amount: 4000,
      brand: 'fiat',
      category_id: 'b205d457-452a-4e65-a7d1-b331b627307e',
    });
    await fakeCarsRepository.create({
      name: 'fiesta',
      description: 'consome muita gasolina',
      dayly_rate: 80,
      license_plate: 'ABCD-5898',
      fine_amount: 13000,
      brand: 'ford',
      category_id: 'b205d457-452a-4e65-a7d1-b331b627307e',
    });
  });

  it('should be able to list all car availability', async () => {
    const allCarsAvailability = await listCarUseCase.execute({});

    expect(allCarsAvailability).toHaveLength(2);
    allCarsAvailability.forEach((car) =>
      expect(car).toEqual(expect.objectContaining({ available: true }))
    );
  });

  it('should be able to list all car availabiliti for name', async () => {
    const allCarsAvailability = await listCarUseCase.execute({
      name: 'palio',
    });

    expect(allCarsAvailability).toHaveLength(1);
    expect(allCarsAvailability).toEqual([
      expect.objectContaining({ name: 'palio' }),
    ]);
  });

  it('should be able to list all car availabiliti for brand', async () => {
    const carAvailable = await listCarUseCase.execute({
      brand: 'ford',
    });

    expect(carAvailable).toHaveLength(1);
    expect(carAvailable).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ brand: 'ford', available: true }),
      ])
    );
  });

  it('should be able to list all car availabiliti for category_id', async () => {
    const allCarsAvailability = await listCarUseCase.execute({
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
