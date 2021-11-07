import { ICategoryRepository } from '../../repositories/ICategoryRepository';

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlredyExist = await this.categoryRepository.findByName(name);

    if (categoryAlredyExist) {
      throw new Error('Category alredy Exists');
    }

    await this.categoryRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
