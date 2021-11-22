import { inject, injectable } from 'tsyringe';

import { ICategoryRepository } from '@modules/cars/repositories/ICategoryRepository';

import { Category } from '../../entities/Category';

@injectable()
class ListCategoryUseCase {
  constructor(
    @inject('ICategoryRepository')
    private categoryRepository: ICategoryRepository
  ) {}

  async execute(): Promise<Category[]> {
    const categories = await this.categoryRepository.list();

    return categories;
  }
}

export { ListCategoryUseCase };
