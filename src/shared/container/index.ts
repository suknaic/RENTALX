import { container } from 'tsyringe';

import { UserRepository } from '@modules/accounts/infra/typeorm/repositories/UserRepository';
import { IUSerRepository } from '@modules/accounts/repositories/IUserRepository';
import { CategoryRepository } from '@modules/cars/infra/typeorm/repositories/CategoryRepositories';
import { SpecificationsRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationsRepository';
import { ICategoryRepository } from '@modules/cars/repositories/ICategoryRepository';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';

container.registerSingleton<ICategoryRepository>(
  'ICategoryRepository',
  CategoryRepository
);

container.registerSingleton<ISpecificationsRepository>(
  'ISpecificationsRepository',
  SpecificationsRepository
);

container.registerSingleton<IUSerRepository>('IUSerRepository', UserRepository);
