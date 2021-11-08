import { inject, injectable } from 'tsyringe';

import { ISpecificationsRepository } from '../../repositories/ISpecificationsRepository';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject('ISpecificationsRepository')
    private SpecificationRepository: ISpecificationsRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const specificationAlredyExists =
      await this.SpecificationRepository.findByName(name);

    if (specificationAlredyExists) {
      throw new Error('Specification Alredy Exists');
    }

    await this.SpecificationRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
