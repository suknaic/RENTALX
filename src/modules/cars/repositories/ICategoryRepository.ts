import { ICreateCategoriDTO } from '../../../dtos/ICreateCategoryDTO';
import { Category } from '../model/Category';

interface ICategoryRepository {
  findByName(name: string): Category;
  list(): Category[];
  create({ name, description }: ICreateCategoriDTO): void;
}

export { ICategoryRepository };
