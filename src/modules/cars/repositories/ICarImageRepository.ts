import { CarImage } from '../infra/typeorm/entities/CarImage';

interface ICarImageRepository {
  create(car_id: string, car_image: string): Promise<CarImage>;
}

export { ICarImageRepository };
