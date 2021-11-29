import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

import { ICarRepository } from '../ICarRepository';

class FakeCarRepository implements ICarRepository {
  private carRepository: Car[];

  constructor() {
    this.carRepository = [];
  }
  async findById(id: string): Promise<Car> {
    const car = this.carRepository.find((car) => car.id === id);
    return car;
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
    id,
    name,
    description,
    dayly_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
    specifications,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      id,
      name,
      description,
      dayly_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      specifications,
    });

    this.carRepository.push(car);

    return car;
  }
}

export { FakeCarRepository };
