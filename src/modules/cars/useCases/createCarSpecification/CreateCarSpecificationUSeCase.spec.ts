import { FakeCarRepository } from '@modules/cars/repositories/Fake/FakeCarRepository';
import { FakeSpecificationRepository } from '@modules/cars/repositories/Fake/FakeSpecificationRepository';
import { AppError } from '@shared/error/AppError';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let fakeSpecificationRepository: FakeSpecificationRepository;
let fakeCarRepository: FakeCarRepository;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;

describe('[CreateCarSpecificationUseCase]', () => {
  beforeAll(async () => {
    fakeSpecificationRepository = new FakeSpecificationRepository();
    fakeCarRepository = new FakeCarRepository();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      fakeCarRepository,
      fakeSpecificationRepository
    );
  });

  it('should be able to add new specifications to the car', async () => {
    const car = await fakeCarRepository.create({
      name: 'new beetle',
      brand: 'volksvagen',
      category_id: 'asasdiasjdiasjd',
      daily_rate: 100,
      description: 'carro pequeno para 2 pessoas',
      fine_amount: 50,
      license_plate: 'abcd-1234',
    });

    const specification = await fakeSpecificationRepository.create({
      name: 'test specification',
      description: 'description',
    });

    await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id: [specification.id],
    });

    expect(car.specifications).toEqual(expect.arrayContaining([specification]));
  });

  it('should not be able to add new specification to the car nonexits', async () => {
    const specification = await fakeSpecificationRepository.create({
      name: 'test specification',
      description: 'description',
    });

    expect(async () => {
      await createCarSpecificationUseCase.execute({
        car_id: 'carDoesNotExists',
        specifications_id: [specification.id],
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
