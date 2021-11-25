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
    category_id,
  }: ICreateCarDTO): Promise<void>;

  findByLincensePlate(license_plate: string): Promise<Car>;
}

export { ICarRepository };
