import { inject, injectable } from 'tsyringe';

import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarRepository } from '@modules/cars/repositories/ICarRepository';

interface IRequest {
  name?: string;
  brand?: string;
  category_id?: string;
}

@injectable()
class ListAvailableCarsUseCase {
  constructor(
    @inject('ICarRepository')
    private carsRepository: ICarRepository
  ) {}

  async execute({ name, brand, category_id }: IRequest): Promise<Car[]> {
    const carsAvailables = await this.carsRepository.findAvailable(
      category_id,
      name,
      brand
    );

    return carsAvailables;
  }
}

export { ListAvailableCarsUseCase };
