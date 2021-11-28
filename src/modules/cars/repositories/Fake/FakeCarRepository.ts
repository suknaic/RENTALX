import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

import { ICarRepository } from '../ICarRepository';

class FakeCarRepository implements ICarRepository {
  private carRepository: Car[];

  constructor() {
    this.carRepository = [];
  }
  async findAvailable(
    category_id?: string,
    name?: string,
    brand?: string
  ): Promise<Car[]> {
    const carsAvailability = this.carRepository.filter((car) => {
      if (
        (name && car.name === name && car.available === true) ||
        (brand && car.brand === brand && car.available === true) ||
        (category_id &&
          car.category_id === category_id &&
          car.available === true) ||
        (!name && !brand && !category_id && car.available === true)
      ) {
        return car;
      }

      return null;
    });

    return carsAvailability;
  }
  async findByLincensePlate(license_plate: string): Promise<Car> {
    const car = this.carRepository.find(
      (car) => car.license_plate === license_plate
    );

    return car;
  }
  async create({
    name,
    description,
    dayly_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: ICreateCarDTO): Promise<void> {
    const car = new Car();

    Object.assign(car, {
      name,
      description,
      dayly_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    });

    this.carRepository.push(car);
  }
}

export { FakeCarRepository };
