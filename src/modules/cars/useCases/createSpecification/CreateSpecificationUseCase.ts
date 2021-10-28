import { ISpecificationsRepository } from '../../repositories/ISpecificationsRepository';

interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationUseCase {
  constructor(private SpecificationRepository: ISpecificationsRepository) {}

  execute({ name, description }: IRequest): void {
    const specificationAlredyExists =
      this.SpecificationRepository.findByName(name);

    if (specificationAlredyExists) {
      throw new Error('Specification Alredy Exists');
    }

    this.SpecificationRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
