import { inject, injectable } from 'tsyringe';

import { ICategoryRepository } from '@modules/cars/repositories/ICategoryRepository';
import { AppError } from '@shared/error/AppError';

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
    const categoryAlreadyExist = await this.categoryRepository.findByName(name);

    if (categoryAlreadyExist) throw new AppError('Category already Exists');

    await this.categoryRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
