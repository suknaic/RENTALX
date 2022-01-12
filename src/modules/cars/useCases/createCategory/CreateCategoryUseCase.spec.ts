import { FakeCategoryRepository } from '@modules/cars/repositories/Fake/FakeCategoryRepositories';
import { AppError } from '@shared/error/AppError';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let categoryRepository: FakeCategoryRepository;
let createCategoryUseCase: CreateCategoryUseCase;

describe('[CreateCategoryUseCase]', () => {
  beforeEach(() => {
    categoryRepository = new FakeCategoryRepository();
    createCategoryUseCase = new CreateCategoryUseCase(categoryRepository);
  });

  it('should be able to create a new Category', async () => {
    const category = {
      name: 'category test',
      description: 'description category test',
    };

    await createCategoryUseCase.execute(category);

    const categoryCreated = await categoryRepository.findByName(category.name);

    expect(categoryCreated).toHaveProperty('id');
  });

  it('should not be able to create a new category with name exists', async () => {
    const category = {
      name: 'category test',
      description: 'description category test',
    };

    await createCategoryUseCase.execute(category);

    await expect(
      createCategoryUseCase.execute(category)
    ).rejects.toBeInstanceOf(AppError);
  });
});
