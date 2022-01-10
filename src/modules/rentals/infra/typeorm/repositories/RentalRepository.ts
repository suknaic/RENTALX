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
    id,
    car_id,
    user_id,
    expected_return_date,
    end_date,
    total,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.rentalRepository.create({
      id,
      car_id,
      user_id,
      expected_return_date,
      end_date,
      total,
    });

    await this.rentalRepository.save(rental);

    return rental;
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const rentalByCar = await this.rentalRepository.findOne({
      where: { car_id, end_date: null },
    });

    return rentalByCar;
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const rentalByUser = await this.rentalRepository.findOne({
      where: { user_id, end_date: null },
    });

    return rentalByUser;
  }

  async findById(id: string): Promise<Rental> {
    const rental = await this.rentalRepository.findOne(id);

    return rental;
  }

  async findByUser(user_id: string): Promise<Rental[]> {
    const rentals = await this.rentalRepository.find({
      where: { user_id },
      relations: ['car'],
    });

    return rentals;
  }
}

export { RentalRepository };
