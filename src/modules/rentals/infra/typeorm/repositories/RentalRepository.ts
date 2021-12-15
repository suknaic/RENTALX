import { getRepository, Repository } from 'typeorm';

import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { IRentalRepository } from '@modules/rentals/repositories/IRentalRepository';

import { Rental } from '../entities/Rental';

class RentalRepository implements IRentalRepository {
  private rentalRepository: Repository<Rental>;

  constructor() {
    this.rentalRepository = getRepository(Rental);
  }

  async create({
    car_id,
    user_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.rentalRepository.create({
      car_id,
      user_id,
      expected_return_date,
    });

    await this.rentalRepository.save(rental);

    return rental;
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const rentalByCar = await this.rentalRepository.findOne({ car_id });

    return rentalByCar;
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const rentalByUser = await this.rentalRepository.findOne({ user_id });

    return rentalByUser;
  }

  async findById(id: string): Promise<Rental> {
    const rental = await this.rentalRepository.findOne(id);

    return rental;
  }
}

export { RentalRepository };
