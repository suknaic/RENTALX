import { ICategoryRepository } from '../../repositories/ICategoryRepository';

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  execute({ name, description }: IRequest): void {
    const categoryAlredyExist = this.categoryRepository.findByName(name);

    if (categoryAlredyExist) {
      throw new Error('Category alredy Exists');
    }

    this.categoryRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
