import { ICarRepository } from '@modules/cars/repositories/ICarRepository';
import { AppError } from '@shared/error/AppError';

interface IRequest {
  name: string;
  description: string;
  dayly_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
}

class CreateCarUseCase {
  constructor(private carRepository: ICarRepository) {}

  async execulte({
    name,
    description,
    dayly_rate,
    license_plate,
    fine_amount,
    brand,
  }: IRequest): Promise<void> {
    const carAlredyExists = await this.carRepository.findByLincensePlate(
      license_plate
    );

    if (carAlredyExists) throw new AppError('Car alredy Existis');

    await this.carRepository.create({
      name,
      description,
      dayly_rate,
      license_plate,
      fine_amount,
      brand,
    });
  }
}

export { CreateCarUseCase };
