import { inject, injectable } from 'tsyringe';

import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { AppError } from '@shared/error/AppError';

interface IRequest {
  name?: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject('ISpecificationsRepository')
    private SpecificationRepository: ISpecificationsRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<Specification> {
    const specificationAlredyExists =
      await this.SpecificationRepository.findByName(name);

    if (specificationAlredyExists)
      throw new AppError('Specification Alredy Exists');

    const specification = await this.SpecificationRepository.create({
      name,
      description,
    });

    return specification;
  }
}

export { CreateSpecificationUseCase };
