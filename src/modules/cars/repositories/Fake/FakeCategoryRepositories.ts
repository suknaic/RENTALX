import { Category } from '@modules/cars/infra/typeorm/entities/Category';

import { ICreateCategoriDTO } from '../../dtos/ICreateCategoryDTO';
import { ICategoryRepository } from '../ICategoryRepository';

class FakeCategoryRepository implements ICategoryRepository {
  private repository: Category[];

  constructor() {
    this.repository = [];
  }

  async create({ name, description }: ICreateCategoriDTO): Promise<void> {
    const categori = new Category();

    Object.assign(categori, {
      name,
      description,
    });
    this.repository.push(categori);
  }

  async list(): Promise<Category[]> {
    const categories = this.repository;
    return categories;
  }

  async findByName(name: string): Promise<Category> {
    const category = this.repository.find((category) => category.name === name);
    return category;
  }
}

export { FakeCategoryRepository };
