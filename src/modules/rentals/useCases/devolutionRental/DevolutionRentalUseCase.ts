import { inject, injectable } from 'tsyringe';

import { ICarRepository } from '@modules/cars/repositories/ICarRepository';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalRepository } from '@modules/rentals/repositories/IRentalRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/model/IDateProvider';
import { AppError } from '@shared/error/AppError';

interface IRequest {
  id: string;
}

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject('IRentalRepository')
    private rentalRepository: IRentalRepository,
    @inject('ICarRepository')
    private carsRepository: ICarRepository,
    @inject('IDateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute({ id }: IRequest): Promise<Rental> {
    const MINIMUM_DAILY = 1;
    let total = 0;

    const rental = await this.rentalRepository.findById(id);
    const car = await this.carsRepository.findById(rental.car_id);

    if (!rental) throw new AppError('Rental does not exists!');

    const dateNow = this.dateProvider.dateNow();

    let daily = this.dateProvider.compareInDays(
      rental.start_date,
      this.dateProvider.dateNow()
    );

    if (daily <= 0) daily = MINIMUM_DAILY;

    const delay = this.dateProvider.compareInDays(
      dateNow,
      rental.expected_return_date
    );

    if (delay > 0) {
      const calculate_fine = delay * car.fine_amount;
      total = calculate_fine;
    }

    total += daily * car.daily_rate;

    rental.end_date = this.dateProvider.dateNow();
    rental.total = total;

    await this.rentalRepository.create(rental);
    await this.carsRepository.updateAvailable(car.id, true);

    return rental;
  }
}

export { DevolutionRentalUseCase };
