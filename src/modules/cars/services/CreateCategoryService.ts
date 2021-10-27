import { ICategoryRepository } from '../repositories/ICategoryRepository';

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryService {
  constructor(private categoryRepository: ICategoryRepository) {
    console.log();
  }

  execute({ name, description }: IRequest): void {
    const categoryAlredyExist = this.categoryRepository.findByName(name);

    if (categoryAlredyExist) {
      throw new Error('Category alredy Exists');
    }

    this.categoryRepository.create({ name, description });
  }
}

export { CreateCategoryService };
