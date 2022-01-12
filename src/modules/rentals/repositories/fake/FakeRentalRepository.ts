import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';

import { IRentalRepository } from '../IRentalRepository';

class FakeRentalRepository implements IRentalRepository {
  private rentalRepository: Rental[];

  constructor() {
    this.rentalRepository = [];
  }

  async create({
    car_id,
    user_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      car_id,
      user_id,
      expected_return_date,
    });

    this.rentalRepository.push(rental);

    return rental;
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const rental = this.rentalRepository.find(
      (rental) => rental.car_id === car_id && !rental.end_date
    );

    return rental;
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const rental = this.rentalRepository.find(
      (rental) => rental.user_id === user_id && !rental.end_date
    );

    return rental;
  }

  async findById(id: string): Promise<Rental> {
    const rental = this.rentalRepository.find((rental) => rental.id === id);
    return rental;
  }
  async findByUser(user_id: string): Promise<Rental[]> {
    const rentals = this.rentalRepository.filter(
      (rental) => rental.user_id === user_id
    );
    return rentals;
  }
}

export { FakeRentalRepository };
