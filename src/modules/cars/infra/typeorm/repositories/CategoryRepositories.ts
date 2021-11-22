import { getRepository, Repository } from 'typeorm';

import { ICreateCategoriDTO } from '@modules/cars/dtos/ICreateCategoryDTO';
import { ICategoryRepository } from '@modules/cars/repositories/ICategoryRepository';

import { Category } from '../entities/Category';

class CategoryRepository implements ICategoryRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async create({ name, description }: ICreateCategoriDTO): Promise<void> {
    const categori = this.repository.create({
      name,
      description,
    });
    await this.repository.save(categori);
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();
    return categories;
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.repository.findOne({ name });
    return category;
  }
}

export { CategoryRepository };
