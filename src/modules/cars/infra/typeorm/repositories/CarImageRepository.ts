import { getRepository, Repository } from 'typeorm';

import { ICarImageRepository } from '@modules/cars/repositories/ICarImageRepository';

import { CarImage } from '../entities/CarImage';

class CarImageRepository implements ICarImageRepository {
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = getRepository(CarImage);
  }

  async create(car_id: string, car_image: string): Promise<CarImage> {
    const carImage = this.repository.create({
      car_id,
      car_image,
    });

    await this.repository.save(carImage);

    return carImage;
  }
}

export { CarImageRepository };
