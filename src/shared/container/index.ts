import { container } from 'tsyringe';

import { ICategoryRepository } from '../../modules/cars/repositories/ICategoryRepository';
import { CategoryRepository } from '../../modules/cars/repositories/implementations/CategoryRepositories';

container.registerSingleton<ICategoryRepository>(
  'ICategoryRepository',
  CategoryRepository
);
