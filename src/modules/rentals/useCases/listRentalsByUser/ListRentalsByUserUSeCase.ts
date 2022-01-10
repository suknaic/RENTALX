import { inject, injectable } from 'tsyringe';

import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalRepository } from '@modules/rentals/repositories/IRentalRepository';

@injectable()
class ListRentalsByUserUseCase {
  constructor(
    @inject('IRentalRepository')
    private readonly rentalRepository: IRentalRepository
  ) {}

  async execute(id: string): Promise<Rental[]> {
    const rentalsByUser = await this.rentalRepository.findByUser(id);

    return rentalsByUser;
  }
}

export { ListRentalsByUserUseCase };
