import { inject, injectable } from 'tsyringe';

import { ICarRepository } from '@modules/cars/repositories/ICarRepository';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalRepository } from '@modules/rentals/repositories/IRentalRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/model/IDateProvider';
import { AppError } from '@shared/error/AppError';

interface IRequest {
  car_id: string;
  user_id: string;
  expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject('IRentalRepository')
    private rentalRepository: IRentalRepository,
    @inject('IDateProvider')
    private dateProvider: IDateProvider,
    @inject('ICarRepository')
    private carRepository: ICarRepository
  ) {}

  async execute({
    car_id,
    user_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const carAvailable = await this.rentalRepository.findOpenRentalByCar(
      car_id
    );

    if (carAvailable) throw new AppError('Car is Unavailable');

    const rentalOpenToUser = await this.rentalRepository.findOpenRentalByUser(
      user_id
    );

    if (rentalOpenToUser) {
      throw new AppError("there's a rental in progress for user!");
    }

    const dateNow = this.dateProvider.dateNow();
    const compareHour = this.dateProvider.compareInHours(
      expected_return_date,
      dateNow
    );

    if (compareHour < 24) throw new AppError('invalid return time');

    const rental = await this.rentalRepository.create({
      car_id,
      user_id,
      expected_return_date,
    });

    await this.carRepository.updateAvailable(car_id, false);

    return rental;
  }
}

export { CreateRentalUseCase };
