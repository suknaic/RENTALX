import { inject, injectable } from 'tsyringe';

import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarRepository } from '@modules/cars/repositories/ICarRepository';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { AppError } from '@shared/error/AppError';

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject('ICarRepository')
    private carRepository: ICarRepository,

    @inject('ISpecificationsRepository')
    private specificationRepository: ISpecificationsRepository
  ) {}

  async execute({ car_id, specifications_id }: IRequest): Promise<Car> {
    const carExists = await this.carRepository.findById(car_id);

    if (!carExists) throw new AppError('Car does not Exists');

    const specifications = await this.specificationRepository.findByIds(
      specifications_id
    );

    Object.assign(carExists, {
      ...carExists,
      specifications,
    });

    const car = await this.carRepository.create(carExists);

    return car;
  }
}

export { CreateCarSpecificationUseCase };
