import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

import { ICarRepository } from '../ICarRepository';

class FakeCarRepository implements ICarRepository {
  private carRepository: Car[];

  constructor() {
    this.carRepository = [];
  }
  async findByLincensePlate(lincese_plate: string): Promise<Car> {
    const car = this.carRepository.find(
      (car) => car.license_plate === lincese_plate
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
  }: ICreateCarDTO): Promise<void> {
    const car = new Car();

    Object.assign(car, {
      name,
      description,
      dayly_rate,
      license_plate,
      fine_amount,
      brand,
    });

    this.carRepository.push(car);
  }
}

export { FakeCarRepository };
