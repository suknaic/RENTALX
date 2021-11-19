import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../error/AppError';
import { ICategoryRepository } from '../../repositories/ICategoryRepository';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject('ICategoryRepository')
    private categoryRepository: ICategoryRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlredyExist = await this.categoryRepository.findByName(name);

    if (categoryAlredyExist) throw new AppError('Category alredy Exists');

    await this.categoryRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
