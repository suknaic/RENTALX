import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalRepository } from '@modules/rentals/repositories/IRentalRepository';
import { AppError } from '@shared/error/AppError';

dayjs.extend(utc);

interface IRequest {
  car_id: string;
  user_id: string;
  expected_return_date: Date;
}

class CreateRentalUseCase {
  constructor(private rentalRepository: IRentalRepository) {}

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

    const expectReturnDateFormat = dayjs(expected_return_date)
      .utc()
      .local()
      .format();
    const dateNow = dayjs().utc().local().format();

    const compareHour = dayjs(expectReturnDateFormat).diff(dateNow, 'hours');

    if (compareHour < 24) throw new AppError('invalid return time');

    console.log('dateNow:', dateNow);

    const rental = await this.rentalRepository.create({
      car_id,
      user_id,
      expected_return_date,
    });

    return rental;
  }
}

export { CreateRentalUseCase };
