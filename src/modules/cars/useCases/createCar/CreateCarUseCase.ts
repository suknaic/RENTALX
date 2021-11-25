import { inject, injectable } from 'tsyringe';

import { ICarRepository } from '@modules/cars/repositories/ICarRepository';
import { AppError } from '@shared/error/AppError';

interface IRequest {
  name: string;
  description: string;
  dayly_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
}

@injectable()
class CreateCarUseCase {
  constructor(
    @inject('ICarRepository')
    private carRepository: ICarRepository
  ) {}

  async execulte({
    name,
    description,
    dayly_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
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
      category_id,
    });
  }
}

export { CreateCarUseCase };
