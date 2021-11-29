import { ICreateCarDTO } from '../dtos/ICreateCarDTO';
import { Car } from '../infra/typeorm/entities/Car';

interface ICarRepository {
  create({
    id,
    name,
    description,
    dayly_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
    specifications,
  }: ICreateCarDTO): Promise<Car>;
  findByLincensePlate(license_plate: string): Promise<Car>;
  findAvailable(
    category_id?: string,
    name?: string,
    brand?: string
  ): Promise<Car[]>;
  findById(id: string): Promise<Car>;
}

export { ICarRepository };
