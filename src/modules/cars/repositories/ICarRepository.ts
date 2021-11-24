import { ICreateCarDTO } from '../dtos/ICreateCarDTO';
import { Car } from '../infra/typeorm/entities/Car';

interface ICarRepository {
  create({
    name,
    description,
    dayly_rate,
    license_plate,
    fine_amount,
    brand,
  }: ICreateCarDTO): Promise<void>;

  findByLincensePlate(lincese_plate: string): Promise<Car>;
}

export { ICarRepository };
