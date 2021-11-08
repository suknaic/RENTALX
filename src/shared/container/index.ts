import { container } from 'tsyringe';

import { ICategoryRepository } from '../../modules/cars/repositories/ICategoryRepository';
import { CategoryRepository } from '../../modules/cars/repositories/implementations/CategoryRepositories';
import { SpecificationsRepository } from '../../modules/cars/repositories/implementations/SpecificationsRepository';
import { ISpecificationsRepository } from '../../modules/cars/repositories/ISpecificationsRepository';

container.registerSingleton<ICategoryRepository>(
  'ICategoryRepository',
  CategoryRepository
);

container.registerSingleton<ISpecificationsRepository>(
  'ISpecificationsRepository',
  SpecificationsRepository
);
